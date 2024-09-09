'use client';
import { Avatar } from '@/components/avatar';
import {
  Dropdown,
  DropdownButton,
  DropdownDivider,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
} from '@/components/dropdown';
import { Notification } from '@/components/notification';
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogTitle,
} from '@/components/dialog';
import { Button, FormButton } from '@/components/button';
import { SidebarLayout } from '@/components/sidebar-layout';
import {
  Navbar,
  NavbarItem,
  NavbarSection,
  NavbarSpacer,
} from '@/components/navbar';
import {
  Sidebar,
  SidebarBody,
  SidebarFooter,
  SidebarHeader,
  SidebarItem,
  SidebarLabel,
  SidebarSection,
} from '@/components/sidebar';
import { Textarea } from '@/components/textarea';
import {
  ArrowRightStartOnRectangleIcon,
  ChevronUpIcon,
  LightBulbIcon,
  UserIcon,
} from '@heroicons/react/16/solid';
import {
  HomeIcon,
  Squares2X2Icon,
  UserGroupIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';
import { Logo } from '@/components/logo';
import { Tables } from '@/types/database.types';
import { logoutUser } from '@/actions/profile';
import { useEffect, useState } from 'react';
import {
  ErrorMessage,
  Field,
  FieldGroup,
  Fieldset,
} from '@/components/fieldset';
import { createFeedback } from '@/actions/feedback';
import { useFormState } from 'react-dom';
export default function DashboardLayoutClient({
  profileData,
  userEmail,
  children,
}: Readonly<{
  children: React.ReactNode;
  profileData: Tables<'profiles'>;
  userEmail: string;
}>) {
  const pathname = usePathname();
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [errorMessage, dispatch] = useFormState(createFeedback, undefined);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (errorMessage && errorMessage.message) {
      setShowError(true);
    }

    if (errorMessage && errorMessage.closeModal) {
      setShowFeedbackForm(false);
    }
  }, [errorMessage, setShowFeedbackForm]);

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
      <SidebarLayout
        navbar={
          <Navbar>
            <NavbarSpacer />
            <NavbarSection>
              <Dropdown>
                <DropdownButton as={NavbarItem}>
                  {profileData.photo_url ? (
                    <Avatar
                      src={profileData.photo_url}
                      square
                      width={28}
                      height={28}
                      className='[&>img]:aspect-square [&>img]:size-7 [&>img]:object-cover'
                      alt={`photo of ${profileData.first_name} ${profileData.last_name}`}
                    />
                  ) : (
                    <Avatar
                      initials={`${profileData.first_name[0]}${profileData.last_name[0]}`}
                      square
                      width={28}
                      height={28}
                      className="size-7 bg-zinc-900 text-white dark:bg-white dark:text-black"
                    />
                  )}
                </DropdownButton>
                <DropdownMenu className="min-w-64" anchor="bottom end">
                  <DropdownItem href="/dashboard/my-profile">
                    <UserIcon />
                    <DropdownLabel>My Account</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem onClick={() => setShowFeedbackForm(true)}>
                    <LightBulbIcon />
                    <DropdownLabel>Share feedback</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem onClick={logoutUser}>
                    <ArrowRightStartOnRectangleIcon />
                    <DropdownLabel>Sign out</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarSection>
          </Navbar>
        }
        sidebar={
          <Sidebar>
            <SidebarHeader>
              <SidebarSection className="lg:mb-2.5">
                <SidebarItem href={'/'}>
                  <Logo className="h-6 w-auto" />
                </SidebarItem>
              </SidebarSection>
            </SidebarHeader>
            <SidebarBody>
              <SidebarSection>
                <SidebarItem
                  href="/dashboard"
                  current={pathname === '/dashboard'}
                >
                  <HomeIcon />
                  <SidebarLabel>Home</SidebarLabel>
                </SidebarItem>
                <SidebarItem
                  href="/dashboard/elections"
                  current={pathname.startsWith('/dashboard/elections')}
                >
                  <Squares2X2Icon />
                  <SidebarLabel>Elections</SidebarLabel>
                </SidebarItem>

                <SidebarItem
                  href="/dashboard/voters"
                  current={pathname.startsWith('/dashboard/voters')}
                >
                  <UserGroupIcon />
                  <SidebarLabel>Voters</SidebarLabel>
                </SidebarItem>

                <SidebarItem
                  href="/dashboard/results"
                  current={pathname.startsWith('/dashboard/results')}
                >
                  <DocumentTextIcon />
                  <SidebarLabel>Results</SidebarLabel>
                </SidebarItem>
              </SidebarSection>
            </SidebarBody>
            <SidebarFooter className="max-lg:hidden">
              <Dropdown>
                <DropdownButton as={SidebarItem}>
                  <span className="flex min-w-0 items-center gap-3">
                    {profileData.photo_url ? (
                      <Avatar
                        src={profileData.photo_url}
                        square
                        width={40}
                        height={40}
                        className='[&>img]:aspect-square [&>img]:size-10 [&>img]:object-cover'
                        alt={`photo of ${profileData.first_name} ${profileData.last_name}`}
                      />
                    ) : (
                      <Avatar
                        initials={`${profileData.first_name[0]}${profileData.last_name[0]}`}
                        square
                        className="size-10 bg-zinc-900 text-white dark:bg-white dark:text-black"
                        width={40}
                        height={40}
                      />
                    )}

                    <span className="min-w-0">
                      <span className="block truncate text-sm/5 font-medium text-zinc-950 dark:text-white">
                        {profileData.first_name}
                      </span>
                      <span className="block truncate text-xs/5 font-normal text-zinc-500 dark:text-zinc-400">
                        {userEmail}
                      </span>
                    </span>
                  </span>
                  <ChevronUpIcon />
                </DropdownButton>
                <DropdownMenu className="min-w-64" anchor="top start">
                  <DropdownItem href="/dashboard/my-profile">
                    <UserIcon />
                    <DropdownLabel>My Account</DropdownLabel>
                  </DropdownItem>
                  <DropdownDivider />
                  <DropdownItem onClick={() => setShowFeedbackForm(true)}>
                    <LightBulbIcon />
                    <DropdownLabel>Share feedback</DropdownLabel>
                  </DropdownItem>
                  <DropdownItem onClick={logoutUser}>
                    <ArrowRightStartOnRectangleIcon />
                    <DropdownLabel>Sign out</DropdownLabel>
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </SidebarFooter>
          </Sidebar>
        }
      >
        <Dialog open={showFeedbackForm} onClose={setShowFeedbackForm}>
          <DialogTitle>Feedback</DialogTitle>
          <form action={dispatch}>
            <DialogBody>
              <Fieldset>
                <FieldGroup>
                  <Field>
                    <Textarea name="feedback" placeholder="Your Feedback" />
                    {errorMessage &&
                      errorMessage.errors?.feedback &&
                      errorMessage.errors.feedback.map((msg, index) => (
                        <ErrorMessage key={index}>{msg}</ErrorMessage>
                      ))}
                  </Field>
                </FieldGroup>
              </Fieldset>
            </DialogBody>
            <DialogActions>
              <Button plain onClick={() => setShowFeedbackForm(false)}>
                Cancel
              </Button>
              <FormButton>Send</FormButton>
            </DialogActions>
          </form>
        </Dialog>
        {children}
      </SidebarLayout>
    </>
  );
}
