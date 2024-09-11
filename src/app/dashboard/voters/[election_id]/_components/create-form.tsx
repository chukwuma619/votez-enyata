import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  ErrorMessage,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { Button, FormButton } from '@/components/button';
import { Notification } from '@/components/notification';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from '@/components/dialog';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useFormState } from 'react-dom';
import { createEligibleVoter } from '@/actions/eligible_voter';

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

  
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (errorMessage && errorMessage.message) {
      setShowError(true);
    }

    if (errorMessage && errorMessage.closeModal) {
      setIsOpen(false);
    }
  }, [errorMessage, setIsOpen]);

  const [file] = useState<File | null>(null);

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
        {/* <div className="flex items-center justify-end">
          <Button
            outline
            onClick={() => {
              setHowImportLargeVoterModal(true);
            }}
          >
            <ArrowUpOnSquareStackIcon /> Upload bulk voters
          </Button>
        </div> */}

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

      
    </>
  );
}
