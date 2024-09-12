'use client';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/table';
import { Badge } from '@/components/badge';
import { deleteEligibleVoter, sendMail } from '@/actions/eligible_voter';
import { Checkbox } from '@/components/checkbox';
import { Button } from '@/components/button';
import { Tables } from '@/types/database.types';
import { useState, useLayoutEffect } from 'react';
import UpdateVoterForm from './edit-form';
import { convertDateTime } from '@/lib/utils';
import {
  Alert,
  AlertTitle,
  AlertDescription,
  AlertActions,
} from '@/components/alert';

export default function VoterTableClient({
  voters,
  election_data,
  creator_profile,
}: {
  voters: Tables<'eligible_voters'>[];
  election_data: Tables<'elections'>;
  creator_profile: Tables<'profiles'>;
}) {
  const [checked, setChecked] = useState(false);
  const [indeterminate, setIndeterminate] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<
    Tables<'eligible_voters'>[]
  >([]);
  const [openEditModel, setOpenEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Tables<'eligible_voters'>>();
  const [sendingStatus, setSendingStatus] = useState<boolean[]>(
    new Array(voters.length).fill(false),
  );
  const [bulkSendingStatus, setBulkSendingStatus] = useState(false);
  const [deletingStatus, setDeletingStatus] = useState<boolean[]>(
    new Array(voters.length).fill(false),
  );
  const [bulkDeletingStatus, setBulkDeletingStatus] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertAction, setAlertAction] = useState<() => void>(() => {});
  const [alertTitle, setAlertTitle] = useState('');
  const [alertDescription, setAlertDescription] = useState('');

  useLayoutEffect(() => {
    const isIndeterminate =
      selectedPeople.length > 0 && selectedPeople.length < voters.length;
    setChecked(selectedPeople.length === voters.length);
    setIndeterminate(isIndeterminate);
  }, [selectedPeople, voters.length]);

  function toggleAll() {
    setSelectedPeople(checked || indeterminate ? [] : voters);
    setChecked(!checked && !indeterminate);
    setIndeterminate(false);
  }

  async function handleMailSending(
    voter: Tables<'eligible_voters'>,
    index: number,
  ) {
    setSendingStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = true;
      return newStatus;
    });

    await sendMail({
      accessCode: voter.access_code,
      electionID: voter.election_id,
      voterName: voter.name,
      creatorName: `${creator_profile.first_name} ${creator_profile.last_name}`,
      electionName: election_data.name,
      startDate: convertDateTime(election_data.start_datetime),
      voterEmail: voter.email,
      endDate: convertDateTime(election_data.end_datetime),
      creatorEmail: 'example@email.com',
    });

    setSendingStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = false;
      return newStatus;
    });
  }

  async function handleBulkMailSending() {
    setBulkSendingStatus(true);
    await Promise.all(
      selectedPeople.map(async (voter, index) => {
        await handleMailSending(voter, index);
      }),
    );
    setBulkSendingStatus(false);
  }

  function confirmDelete(
    action: () => void,
    title: string,
    description: string,
  ) {
    setAlertAction(() => action);
    setAlertTitle(title);
    setAlertDescription(description);
    setIsAlertOpen(true);
  }

  async function handleDelete(voter: Tables<'eligible_voters'>, index: number) {
    setDeletingStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = true;
      return newStatus;
    });

    await deleteEligibleVoter(voter.access_code, voter.election_id);

    setDeletingStatus((prev) => {
      const newStatus = [...prev];
      newStatus[index] = false;
      return newStatus;
    });
  }

  async function handleBulkDelete() {
    setBulkDeletingStatus(true);
    await Promise.all(
      selectedPeople.map(async (voter) => {
        await deleteEligibleVoter(voter.access_code, voter.election_id);
      }),
    );
    setBulkDeletingStatus(false);
    setSelectedPeople([]);
  }

  return (
    <>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative">
              {selectedPeople.length > 0 && (
                <div className="absolute left-14 top-0 flex items-center space-x-3 bg-white sm:left-12 dark:bg-zinc-900">
                  <Button
                    disabled={bulkSendingStatus}
                    onClick={handleBulkMailSending}
                  >
                    {bulkSendingStatus ? (
                      <svg
                        className="mr-3 h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      `Bulk Send`
                    )}
                  </Button>
                  <Button
                    disabled={bulkDeletingStatus}
                    onClick={() =>
                      confirmDelete(
                        handleBulkDelete,
                        'Confirm Bulk Delete',
                        'Are you sure you want to delete all selected voters? This action cannot be undone.',
                      )
                    }
                  >
                    {bulkSendingStatus ? (
                      <svg
                        className="mr-3 h-5 w-5 animate-spin"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                    ) : (
                      `Delete All`
                    )}
                  </Button>
                </div>
              )}
              <Table
                bleed
                className="[--gutter:theme(spacing.6)] sm:[--gutter:theme(spacing.8)]"
              >
                <TableHead>
                  <TableRow>
                    <TableHeader>
                      <Checkbox
                        title="checkbox"
                        checked={
                          checked ||
                          (selectedPeople.length > 0 &&
                            selectedPeople.length < voters.length)
                        }
                        onChange={toggleAll}
                      />
                    </TableHeader>
                    <TableHeader>Name</TableHeader>
                    <TableHeader>Email</TableHeader>
                    <TableHeader>Message Status</TableHeader>
                    <TableHeader>Actions</TableHeader>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {voters.map((person, index) => (
                    <TableRow
                      key={index}
                      className={
                        selectedPeople.includes(person)
                          ? 'bg-zinc-950/[2.5%] dark:bg-white/[2.5%]'
                          : undefined
                      }
                    >
                      <TableCell className="relative">
                        {selectedPeople.includes(person) && (
                          <div className="absolute inset-y-0 left-0 w-0.5 bg-zinc-950 dark:bg-white" />
                        )}
                        <Checkbox
                          aria-label="Select"
                          value={person.email}
                          checked={selectedPeople.includes(person)}
                          onChange={(checked) =>
                            setSelectedPeople(
                              checked
                                ? [...selectedPeople, person]
                                : selectedPeople.filter((p) => p !== person),
                            )
                          }
                        />
                      </TableCell>
                      <TableCell className="font-medium">
                        {person.name}
                      </TableCell>
                      <TableCell>{person.email}</TableCell>
                      <TableCell>
                        {person.msg_status ? (
                          <Badge color="green">Sent</Badge>
                        ) : (
                          <Badge color="yellow">Pending</Badge>
                        )}
                      </TableCell>
                      <TableCell className="space-x-3">
                        <Button
                          outline
                          type="button"
                          disabled={sendingStatus[index]}
                          onClick={() => handleMailSending(person, index)}
                        >
                          {sendingStatus[index] && (
                            <svg
                              className="mr-3 h-5 w-5 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          )}
                          Send
                        </Button>
                        <Button
                          outline
                          onClick={() => {
                            setSelectedData(person);
                            setOpenEditModal(true);
                          }}
                          type="button"
                        >
                          Edit
                        </Button>
                        <Button
                          outline
                          onClick={() =>
                            confirmDelete(
                              () => handleDelete(person, index),
                              'Confirm Delete',
                              `Are you sure you want to delete voter ${person.name}? This action cannot be undone.`,
                            )
                          }
                          type="button"
                        >
                          {deletingStatus[index] && (
                            <svg
                              className="mr-3 h-5 w-5 animate-spin"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                          )}
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
      {selectedData && (
        <UpdateVoterForm
          isOpen={openEditModel}
          setIsOpen={setOpenEditModal}
          data={selectedData}
        />
      )}

      {isAlertOpen && (
        <Alert open={isAlertOpen} onClose={setIsAlertOpen}>
          <AlertTitle>{alertTitle}</AlertTitle>
          <AlertDescription>{alertDescription}</AlertDescription>

          <AlertActions>
            <Button plain onClick={() => setIsAlertOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                alertAction();
                setIsAlertOpen(false);
              }}
            >
              Confirm
            </Button>
          </AlertActions>
        </Alert>
      )}
    </>
  );
}
