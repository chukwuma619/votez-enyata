import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  ErrorMessage,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/button';
import { Notification } from '@/components/notification';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from '@/components/dialog';
import {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  ChangeEvent,
} from 'react';
import { useFormState } from 'react-dom';
import { createElection } from '@/actions/election';
import { FormButton } from '@/components/button';
import {getCurrentDateTime } from '@/lib/utils';
export default function CreateElectionForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [errorMessage, dispatch] = useFormState(createElection, undefined);
  const [showError, setShowError] = useState(false);
  const now = getCurrentDateTime();
  const [stDatetime, setStDatetime] = useState(now);
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
      <Dialog open={isOpen} onClose={() => {}} size="xl">
        <DialogTitle>Create Election</DialogTitle>
        <form action={dispatch}>
          <DialogBody>
            <Fieldset aria-label="create election">
              <FieldGroup>
                <Field>
                  <Label>Election name</Label>
                  <Input
                    name="name"
                    placeholder="Election name"
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
                  <Label>Description (optional)</Label>
                  <Textarea
                    name="description"
                    placeholder="Briefly describe the purpose and importance of this election."
                    invalid={errorMessage?.errors?.description && true}
                  />
                  {errorMessage &&
                    errorMessage.errors?.description &&
                    errorMessage.errors.description.map((msg, index) => (
                      <ErrorMessage key={index}>{msg}</ErrorMessage>
                    ))}
                </Field>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                  <Field>
                    <Label>Start datetime</Label>
                    <Input
                      name="start_datetime"
                      type="datetime-local"
                      min={stDatetime}
                      onChange={(event: ChangeEvent<HTMLInputElement>) => {
                        setStDatetime(event.target.value);
                      }}
                      invalid={errorMessage?.errors?.start_datetime && true}
                    />
                    {errorMessage &&
                      errorMessage.errors?.start_datetime &&
                      errorMessage.errors.start_datetime.map((msg, index) => (
                        <ErrorMessage key={index}>{msg}</ErrorMessage>
                      ))}
                  </Field>

                  <Field>
                    <Label>End datetime</Label>
                    <Input
                      name="end_datetime"
                      type="datetime-local"
                      min={stDatetime}
                      invalid={errorMessage?.errors?.end_datetime && true}
                    />
                    {errorMessage &&
                      errorMessage.errors?.end_datetime &&
                      errorMessage.errors.end_datetime.map((msg, index) => (
                        <ErrorMessage key={index}>{msg}</ErrorMessage>
                      ))}
                  </Field>
                </div>

                
              </FieldGroup>
            </Fieldset>
          </DialogBody>

          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <FormButton>Create</FormButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
