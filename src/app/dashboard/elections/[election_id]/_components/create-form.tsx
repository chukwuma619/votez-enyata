import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  ErrorMessage,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Notification } from '@/components/notification';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from '@/components/dialog';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { FormButton } from '@/components/button';
import { createPosition } from '@/actions/position';
export default function CreatePositionForm({
  election_id,
  isOpen,
  setIsOpen,
}: {
  election_id: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [errorMessage, dispatch] = useFormState(
    createPosition.bind(null, election_id),
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
        <DialogTitle>Add Position</DialogTitle>

        <form action={dispatch}>
          <DialogBody>
            <Fieldset aria-label="create elections">
              <FieldGroup>
                <Field>
                  <Label>Position name</Label>
                  <Input
                    name="name"
                    placeholder="Position name"
                    invalid={errorMessage?.errors?.name && true}
                    autoFocus
                  />
                  {errorMessage &&
                    errorMessage.errors?.name &&
                    errorMessage.errors.name.map((msg, index) => (
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
