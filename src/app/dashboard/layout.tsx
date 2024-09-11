import { getAuthUser, getAuthUserProfile } from '@/data/profile';
import { notFound, redirect } from 'next/navigation';
import DashboardLayoutClient from './_components/dashboard-layout-client';
export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userData = await getAuthUser();
  if (!userData) {
    redirect('auth/sign-in');
  }
  const userProfileData = await getAuthUserProfile(userData.id);
  if (!userProfileData) {
    notFound();
  }
  return (
    <DashboardLayoutClient
      profileData={userProfileData}
      userEmail={userData.email!}
    >
      {children}
    </DashboardLayoutClient>
  );
}
