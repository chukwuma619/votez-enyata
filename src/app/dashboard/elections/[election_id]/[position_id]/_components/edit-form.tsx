'use client';
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  ErrorMessage,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Button, FormButton } from '@/components/button';
import Image from 'next/image';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from '@/components/dialog';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { updateCandidate } from '@/actions/candidate';
import { useFormState } from 'react-dom';
import { Notification } from '@/components/notification';
import { Tables } from '@/types/database.types';

export default function UpdateCandidateForm({
  data,
  election_id,
  isOpen,
  setIsOpen,
}: {
  data: Tables<'candidates'>;
  election_id: string;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [previewImg, setPreviewImg] = useState(
    data.photo_url || '/images/placeholder-user-image.jpg',
  );
  const [errorMessage, dispatch] = useFormState(
    updateCandidate.bind(null, data.id, data.position_id, election_id),
    undefined,
  );
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage && errorMessage.message) {
      setShowError(true);
    }

    if (errorMessage && errorMessage.closeModal) {
      setIsOpen(false);
      setPreviewImg(data.photo_url || '/images/placeholder-user-image.jpg');
    }
  }, [data.photo_url, errorMessage, setIsOpen]);

  function handleImageChange(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>) => {
        setPreviewImg(ev.target?.result! as string);
      };
      reader.readAsDataURL(file);
    }
  }
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
        <DialogTitle>Add Candidate</DialogTitle>

        <form action={dispatch}>
          <DialogBody>
            <Fieldset aria-label="update candidate">
              <FieldGroup>
                <Field className="flex items-center space-x-6">
                  <div className="shrink-0">
                    <Image
                      width={64}
                      height={64}
                      className="size-16 rounded-md object-cover"
                      src={previewImg}
                      alt="Current profile photo"
                    />
                  </div>
                  <label>
                    <span className="sr-only">Choose profile photo</span>
                    <Input
                      name="photo"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="before:shadow-none after:!ring-0 [&>input[type='file']]:border-none [&>input[type='file']]:bg-transparent file:[&>input[type='file']]:mr-4 file:[&>input[type='file']]:rounded-full file:[&>input[type='file']]:border-0 file:[&>input[type='file']]:bg-zinc-50 file:[&>input[type='file']]:px-4 file:[&>input[type='file']]:py-2 file:[&>input[type='file']]:text-sm file:[&>input[type='file']]:font-semibold file:[&>input[type='file']]:text-zinc-500 file:[&>input[type='file']]:hover:bg-zinc-100 file:[&>input[type='file']]:dark:bg-white/5 file:[&>input[type='file']]:dark:text-zinc-300 file:[&>input[type='file']]:dark:hover:bg-white/10"
                      invalid={errorMessage?.errors?.photo && true}
                    />
                    {errorMessage &&
                      errorMessage.errors?.photo &&
                      errorMessage.errors.photo.map((msg, index) => (
                        <ErrorMessage key={index}>{msg}</ErrorMessage>
                      ))}
                  </label>
                </Field>

                <Field>
                  <Label>Candidate name</Label>
                  <Input
                    name="name"
                    placeholder="Election name"
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
                  <Label>Bio (optional)</Label>
                  <Textarea
                    name="bio"
                    placeholder=""
                    defaultValue={data.bio || ''}
                    invalid={errorMessage?.errors?.bio && true}
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
            <FormButton>Update</FormButton>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
