import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/button';

import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from '@/components/dialog';
import { Dispatch, SetStateAction } from 'react';

export default function CreateElectionForm({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <>
      <Dialog open={isOpen} onClose={setIsOpen}>
        <DialogTitle>Create Election</DialogTitle>

        <form action="/orders" method="POST">
          <DialogBody>
            <Fieldset aria-label="Shipping details">
              <FieldGroup>
                <Field>
                  <Label>Election name</Label>
                  <Input name="name" placeholder="Election name" autoFocus />
                </Field>

                <Field>
                  <Label>Description (optional)</Label>
                  <Textarea name="description" placeholder="" />
                </Field>
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4">
                  <Field>
                    <Label>Start datetime</Label>
                    <Input name="start_datetime" type="datetime-local" />
                  </Field>

                  <Field>
                    <Label>End datetime</Label>
                    <Input name="end_datetime" type="datetime-local" />
                  </Field>
                </div>
              </FieldGroup>
            </Fieldset>
          </DialogBody>

          <DialogActions>
            <Button plain onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" onClick={() => setIsOpen(false)}>
              Create
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
