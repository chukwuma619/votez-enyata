'use client';
import { Button } from '@/components/button';
import { Heading, Subheading } from '@/components/heading';
import { Divider } from '@/components/divider';
import { Text } from '@/components/text';
import {
  Dropdown,
  DropdownButton,
  DropdownItem,
  DropdownMenu,
} from '@/components/dropdown';
import { useState } from 'react';
import CreateCandidateForm from '@/app/dashboard/elections/[election_id]/[position_id]/_components/create-form';

import { Avatar } from '@/components/avatar';
import { EllipsisVerticalIcon } from '@heroicons/react/24/solid';
import { Tables } from '@/types/database.types';
import UpdateCandidateForm from './edit-form';
import { deleteCandidate } from '@/actions/candidate';
import { Link } from '@/components/link';
import { ChevronLeftIcon } from '@heroicons/react/24/solid';

export default function CandidateClient({
  candidates,
  position_id,
  election_id,
}: {
  candidates: Tables<'candidates'>[];
  position_id: string;
  election_id: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [openEditModel, setOpenEditModal] = useState(false);
  const [selectedData, setSelectedData] = useState<Tables<'candidates'>>();
 
  return (
    <>
      <div className="max-lg:hidden">
        <Link
          href={`/dashboard/elections/${election_id}`}
          className="inline-flex items-center gap-2 text-sm/6 text-zinc-500 dark:text-zinc-400"
        >
          <ChevronLeftIcon className="size-4 fill-zinc-400 dark:fill-zinc-500" />
          Positions
        </Link>
      </div>
      <div className="flex items-end justify-between gap-4">
        <Heading>Candidate</Heading>
        <Button
          type="button"
          onClick={() => {
            setIsOpen(true);
          }}
        >
          Add Candidate
        </Button>
      </div>
      <div className="mt-10">
        <Divider />
        {candidates.length > 0 ? (
          <div className="space-y-8 divide-y divide-zinc-950/10 sm:gap-4 dark:divide-white/10">
            {candidates.map((candidate, index) => (
              <div
                key={index}
                className="grid grid-cols-[64px_auto_48px] gap-6 py-6 md:grid-cols-[64px_auto_150px]"
              >
                <Avatar
                  src={candidate.photo_url}
                  className="[&>img]:aspect-square [&>img]:size-16 [&>img]:object-cover"
                  width={64}
                  height={64}
                  square
                  alt={`photo of ${candidate.name}`}
                />
                <div>
                  <Subheading className="!text-lg/7">
                    {candidate.name}
                  </Subheading>
                  <Text>{candidate.bio} </Text>
                </div>
                <div className="relative block md:hidden">
                  <Dropdown>
                    <DropdownButton outline>
                      <EllipsisVerticalIcon />
                    </DropdownButton>
                    <DropdownMenu>
                      <DropdownItem
                        onClick={() => {
                          setSelectedData(candidate);
                          setOpenEditModal(true);
                        }}
                      >
                        Edit
                      </DropdownItem>
                      <DropdownItem
                        onClick={() => {
                          deleteCandidate(
                            candidate.id,
                            candidate.position_id,
                            election_id,
                          );
                        }}
                      >
                        Delete
                      </DropdownItem>
                    </DropdownMenu>
                  </Dropdown>
                </div>

                <div className="hidden items-center gap-4 md:flex">
                  <Button
                    outline
                    onClick={() => {
                      setSelectedData(candidate);
                      setOpenEditModal(true);
                    }}
                    type="button"
                  >
                    Edit
                  </Button>

                  <Button
                    color="red"
                    onClick={() => {
                      deleteCandidate(
                        candidate.id,
                        candidate.position_id,
                        election_id,
                      );
                    }}
                    type="button"
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-36 flex size-full items-center justify-center">
            <div className="text-center">
              <Subheading level={2} className="mt-2">
                No Candidate
              </Subheading>

              <Text className="mt-1">
                Get started by creating a new candidate
              </Text>
            </div>
          </div>
        )}
      </div>

      <CreateCandidateForm
        position_id={position_id}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        election_id={election_id}
      />

      {selectedData && (
        <UpdateCandidateForm
          isOpen={openEditModel}
          setIsOpen={setOpenEditModal}
          election_id={election_id}
          data={selectedData}
        />
      )}
    </>
  );
}
