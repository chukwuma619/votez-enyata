import {
  Description,
  Field,
  FieldGroup,
  Fieldset,
  Label,
  ErrorMessage,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Button, FormButton } from '@/components/button';
import { Notification } from '@/components/notification';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from '@/components/dialog';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { createEligibleVoter } from '@/actions/eligible_voter';
import {
  ArrowDownTrayIcon,
  ArrowUpOnSquareStackIcon,
  ArrowUpTrayIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

import { FileUploader } from 'react-drag-drop-files';
import { Strong, Text } from '@/components/text';
export default function CreateVoterForm({
  isOpen,
  setIsOpen,
  election_id,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  election_id: string;
}) {
  const [errorMessage, dispatch] = useFormState(
    createEligibleVoter.bind(null, election_id),
    undefined,
  );

  const [showImportLargeVoterModal, setHowImportLargeVoterModal] =
    useState(false);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (errorMessage && errorMessage.message) {
      setShowError(true);
    }

    if (errorMessage && errorMessage.closeModal) {
      setIsOpen(false);
    }
  }, [errorMessage, setIsOpen]);
  const fileTypes = ['.csv', '.xls', '.xlsx'];

  const [file, setFile] = useState<File | null>(null);
  const handleChange = (file: SetStateAction<File | null>) => {
    setFile(file);
  };

  console.log(file);
  return (
    <>
      {errorMessage && (
        <Notification
          message={errorMessage.message!}
          status="error"
          show={showError}
          setShow={setShowError}
        />
      )}
      <Dialog open={isOpen} onClose={() => {}}>
        <DialogTitle>Add Voter</DialogTitle>
        <div className="flex items-center justify-end">
          <Button
            outline
            onClick={() => {
              setHowImportLargeVoterModal(true);
            }}
          >
            <ArrowUpOnSquareStackIcon /> Upload bulk voters
          </Button>
        </div>

        <form action={dispatch}>
          <DialogBody>
            <Fieldset aria-label="add voter">
              <FieldGroup>
                <Field>
                  <Label>Full name</Label>
                  <Input
                    name="name"
                    placeholder="John doe"
                    invalid={errorMessage?.errors?.name && true}
                    autoFocus
                  />
                  {errorMessage &&
                    errorMessage.errors?.name &&
                    errorMessage.errors.name.map((msg, index) => (
                      <ErrorMessage key={index}>{msg}</ErrorMessage>
                    ))}
                </Field>

                <Field>
                  <Label>Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="example@email.com"
                    invalid={errorMessage?.errors?.email && true}
                  />

                  {errorMessage &&
                    errorMessage.errors?.email &&
                    errorMessage.errors.email.map((msg, index) => (
                      <ErrorMessage key={index}>{msg}</ErrorMessage>
                    ))}
                </Field>
              </FieldGroup>
            </Fieldset>
          </DialogBody>

          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <FormButton>Add</FormButton>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog
        open={showImportLargeVoterModal}
        onClose={setHowImportLargeVoterModal}
      >
        <div className="flex items-center justify-between">
          <DialogTitle>Import voters</DialogTitle>
          <Button outline onClick={() => setIsOpen(false)}>
            <XMarkIcon />
          </Button>
        </div>
        <DialogDescription>
          Import allow maxs 5000 voters at once. <br /> Support .csv, .xls and
          .xlsx format.
        </DialogDescription>
        <DialogBody>
          <FileUploader
            required={true}
            handleChange={handleChange}
            name="file"
            types={fileTypes}
          >
            <div className="flex w-full cursor-pointer flex-col items-center justify-center gap-8 bg-zinc-50 py-8 outline-2 -outline-offset-8 outline-zinc-950/5 dark:bg-zinc-900 dark:outline-white/5">
              <ArrowUpTrayIcon width={32} hanging={32} />
              <Text className="inline-block max-w-[805] overflow-hidden text-ellipsis whitespace-nowrap">
                <Strong>Choose a file</Strong> or drag it here
              </Text>
            </div>
          </FileUploader>
        </DialogBody>
        <DialogActions className="flex !justify-start">
          <Button plain className="!font-normal">
            <ArrowDownTrayIcon /> Download Sample
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
