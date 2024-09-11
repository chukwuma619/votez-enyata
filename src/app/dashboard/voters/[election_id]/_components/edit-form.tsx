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
import { Tables } from '@/types/database.types';
import { useFormState } from 'react-dom';
import { updateEligibleVoter } from '@/actions/eligible_voter';

export default function UpdateVoterForm({
  data,
  isOpen,
  setIsOpen,
}: {
  data: Tables<'eligible_voters'>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [errorMessage, dispatch] = useFormState(
    updateEligibleVoter.bind(null, data.id, data.election_id),
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
        <DialogTitle>Edit Voter</DialogTitle>

        <form action={dispatch}>
          <DialogBody>
            <Fieldset aria-label="update voter">
              <FieldGroup>
                <Field>
                  <Label>Full name</Label>
                  <Input
                    name="name"
                    placeholder="John doe"
                    defaultValue={data.name}
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
                    defaultValue={data.email}
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
            <FormButton>Save Changes</FormButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
