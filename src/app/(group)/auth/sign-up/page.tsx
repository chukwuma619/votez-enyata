'use client';
import { useEffect, useRef, useState } from 'react';
import { Heading } from '@/components/heading';
import { Text, TextLink } from '@/components/text';
import {
  Field,
  FieldGroup,
  Fieldset,
  Label,
  ErrorMessage,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { Button, FormButton } from '@/components/button';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Notification } from '@/components/notification';
import { registerUser } from '@/actions/profile';
import { useFormState } from 'react-dom';
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, dispatch] = useFormState(registerUser, undefined);
  const [showError, setShowError] = useState(false);
  useEffect(() => {
    if (showPassword) {
      inputRef.current?.setAttribute('type', 'text');
    } else {
      inputRef.current?.setAttribute('type', 'password');
    }
  }, [showPassword]);

  useEffect(() => {
    if (errorMessage) {
      setShowError(true);
    }
  }, [errorMessage]);
  return (
    <>
      {errorMessage && (
        <Notification
          message={errorMessage.message}
          status="error"
          show={showError}
          setShow={setShowError}
        />
      )}
      <div className="relative mt-12 sm:mt-16">
        <Heading className="text-center !text-2xl font-medium tracking-tight">
          Get started for free
        </Heading>

        <Text className="mt-3 text-center !text-base">
          Already registered?{' '}
          <TextLink href={'/auth/sign-in'}>Sign in</TextLink> to your account
        </Text>
      </div>
      <div className="-mx-4 mt-10 flex-auto bg-zinc-50 px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-3xl sm:p-16 dark:bg-zinc-900">
        <form action={dispatch}>
          <Fieldset aria-label="Sign in to your account">
            <FieldGroup>
              <div className="flex w-full flex-col gap-8 md:flex-row">
                <Field className="w-full">
                  <Label>First name</Label>
                  <Input
                    type="text"
                    name="first_name"
                    placeholder="John"
                    autoComplete="given-name"
                    autoFocus
                    invalid={errorMessage?.errors?.first_name && true}
                  />

                  {errorMessage &&
                    errorMessage.errors?.first_name &&
                    errorMessage.errors.first_name.map((msg, index) => (
                      <ErrorMessage key={index}>{msg}</ErrorMessage>
                    ))}
                </Field>

                <Field className="w-full">
                  <Label>Last name</Label>
                  <Input
                    type="text"
                    name="last_name"
                    placeholder="Doe"
                    autoComplete="family-name"
                    invalid={errorMessage?.errors?.last_name && true}
                  />
                  {errorMessage &&
                    errorMessage.errors?.last_name &&
                    errorMessage.errors.last_name.map((msg, index) => (
                      <ErrorMessage key={index}>{msg}</ErrorMessage>
                    ))}
                </Field>
              </div>
              <Field>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  placeholder="example@email.com"
                  invalid={errorMessage?.errors?.email && true}
                />
                {errorMessage &&
                  errorMessage.errors?.email &&
                  errorMessage.errors.email.map((msg, index) => (
                    <ErrorMessage key={index}>{msg}</ErrorMessage>
                  ))}
              </Field>

              <Field className="">
                <Label>Password</Label>
                <div className="relative">
                  <Input
                    ref={inputRef}
                    className="relative"
                    type="password"
                    name="password"
                    autoComplete="new-password"
                    placeholder="password"
                    invalid={errorMessage?.errors?.password && true}
                  />
                  <div className="absolute inset-y-0 right-0 z-10 flex items-center pr-3">
                    <Button
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                      plain
                      className="!size-5 !p-0 hover:!bg-transparent"
                    >
                      {!showPassword ? (
                        <EyeIcon className="h-5 w-5" aria-hidden="true" />
                      ) : (
                        <EyeSlashIcon className="h-5 w-5" aria-hidden="true" />
                      )}
                    </Button>
                  </div>
                </div>

                {errorMessage &&
                  errorMessage.errors?.password &&
                  errorMessage.errors.password.map((msg, index) => (
                    <ErrorMessage key={index}>{msg}</ErrorMessage>
                  ))}
              </Field>
            </FieldGroup>
            <FormButton className="mt-8 w-full">
              Sign up <span aria-hidden="true">→</span>
            </FormButton>
          </Fieldset>
        </form>
      </div>
    </>
  );
}
