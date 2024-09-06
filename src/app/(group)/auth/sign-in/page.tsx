'use client';
import { Heading } from '@/components/heading';
import { Text, TextLink } from '@/components/text';
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
  Label,
} from '@/components/fieldset';
import { Input } from '@/components/input';
import { Button, FormButton } from '@/components/button';
import { useEffect, useRef, useState, Fragment } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useFormState } from 'react-dom';
import { signInWithEmail } from '@/actions/profile';
import { Notification } from '@/components/notification';
export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [errorMessage, dispatch] = useFormState(signInWithEmail, undefined);
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
          Sign in to your account
        </Heading>

        <Text className="mt-3 text-center !text-base">
          Don&apos; have an account yet?{' '}
          <TextLink href={'/auth/sign-up'}>Sign up</TextLink>
        </Text>
      </div>
      <div className="-mx-4 mt-10 flex-auto bg-gray-50 px-4 py-10 shadow-2xl shadow-gray-900/10 sm:mx-0 sm:flex-none sm:rounded-3xl sm:p-16 dark:bg-zinc-900/5">
        <form action={dispatch}>
          <Fieldset aria-label="Sign in to your account">
            <FieldGroup>
              <Field>
                <Label>Email</Label>
                <Input
                  type="email"
                  name="email"
                  autoComplete="email"
                  invalid={errorMessage?.errors?.email && true}
                  placeholder="example@email.com"
                  autoFocus
                />
                {errorMessage &&
                  errorMessage.errors?.email &&
                  errorMessage.errors.email.map((msg, index) => (
                    <ErrorMessage key={index}>{msg}</ErrorMessage>
                  ))}
              </Field>

              <Field>
                <div className="mb-2 flex items-center justify-between">
                  <Label>Password</Label>
                  <TextLink href="#" className="!text-sm">
                    Forgot password
                  </TextLink>
                </div>
                <div className="relative">
                  <Input
                    ref={inputRef}
                    className="relative"
                    type="password"
                    name="password"
                    invalid={errorMessage?.errors?.password && true}
                    autoComplete="current-password"
                    placeholder="password"
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
              Sign in <span aria-hidden="true">→</span>
            </FormButton>
          </Fieldset>
        </form>
      </div>
    </>
  );
}
