'use client';
import { useState, useEffect } from 'react';
import { Notification } from '@/components/notification';
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { FormButton } from '@/components/button';
import { useFormState } from 'react-dom';
import { validateVoter } from '@/actions/eligible_voter';
export default function VerifyForm({ election_id }: { election_id: string }) {
  const [errorMessage, dispatch] = useFormState(
    validateVoter.bind(null, election_id),
    undefined,
  );

  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (errorMessage) {
      setShowError(true);
    }
  }, [errorMessage]);
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
      <div className="-mx-4 mt-10 flex-auto bg-zinc-100 px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-3xl sm:p-16 dark:bg-zinc-900">
        <form action={dispatch}>
          <Fieldset aria-label="verify access code">
            <FieldGroup>
              <Field>
                <Label>Access Token</Label>
                <Input name="access-code" placeholder="HAzgRt2HXa" autoFocus />
              </Field>
            </FieldGroup>
            <FormButton type="submit" className="mt-6 w-full">
              Validate
            </FormButton>
          </Fieldset>
        </form>
      </div>
    </>
  );
}
