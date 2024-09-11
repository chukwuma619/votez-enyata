import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  ErrorMessage,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { Button, FormButton } from '@/components/button';

import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from '@/components/dialog';
import { Dispatch, SetStateAction, useState, useEffect } from 'react';
import { useFormState } from 'react-dom';
import { updatePosition } from '@/actions/position';
import { Tables } from '@/types/database.types';
import { Notification } from '@/components/notification';
export default function UpdatePositionForm({
  data,
  isOpen,
  setIsOpen,
}: {
  data: Tables<'positions'>;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [errorMessage, dispatch] = useFormState(
    updatePosition.bind(null, data.id, data.election_id),
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
        <DialogTitle>Update Position</DialogTitle>

        <form action={dispatch}>
          <DialogBody>
            <Fieldset aria-label="update position">
              <FieldGroup>
                <Field>
                  <Label>Position name</Label>
                  <Input
                    name="name"
                    defaultValue={data.name}
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
            <FormButton>Update Position</FormButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
