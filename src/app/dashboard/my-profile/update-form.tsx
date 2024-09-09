'use client';
import { FormButton } from '@/components/button';
import { Heading } from '@/components/heading';
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid';
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import Image from 'next/image';
import { Field, FieldGroup, Fieldset } from '@/components/fieldset';
import { Input, InputGroup } from '@/components/input';
import { Label, ErrorMessage } from '@/components/fieldset';
import { useFormState } from 'react-dom';
import { Notification } from '@/components/notification';
import { Tables } from '@/types/database.types';
import { Divider } from '@/components/divider';
import { updateProfile } from '@/actions/profile';

export default function UpdateProfileForm({
  data,
}: {
  data: Tables<'profiles'>;
}) {
  let [previewImg, setPreviewImg] = useState(
    data.photo_url || '/images/placeholder-user-image.jpg',
  );

  const [errorMessage, dispatch] = useFormState(
    updateProfile.bind(null, data.id),
    undefined,
  );
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage && errorMessage.message) {
      setShowError(true);
    }
  }, [data.photo_url, errorMessage]);

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
      <form action={dispatch} className="max-w-xl">
        <Heading
          level={2}
          className="text-base font-semibold leading-7 text-gray-900"
        >
          Profile
        </Heading>
        <Fieldset
          aria-label="update profile"
          className="mt-10 border-b border-zinc-950/10 pb-12 dark:border-white/10"
        >
          <FieldGroup className="space-y-12">
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
              <Label>First name</Label>
              <Input
                name="first-name"
                id="first-name"
                autoComplete="given-name"
                defaultValue={data.first_name}
                invalid={errorMessage?.errors?.first_name && true}
                autoFocus
              />
              {errorMessage &&
                errorMessage.errors?.first_name &&
                errorMessage.errors.first_name.map((msg, index) => (
                  <ErrorMessage key={index}>{msg}</ErrorMessage>
                ))}
            </Field>

            <Field>
              <Label>Last name</Label>
              <Input
                name="last-name"
                id="last-name"
                autoComplete="family-name"
                defaultValue={data.last_name}
                invalid={errorMessage?.errors?.last_name && true}
              />
              {errorMessage &&
                errorMessage.errors?.last_name &&
                errorMessage.errors.last_name.map((msg, index) => (
                  <ErrorMessage key={index}>{msg}</ErrorMessage>
                ))}
            </Field>
          </FieldGroup>
        </Fieldset>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <FormButton type="submit">Save</FormButton>
        </div>
      </form>
    </>
  );
}
