import { getAuthUser, getAuthUserProfile } from '@/data/profile';
import { notFound, redirect } from 'next/navigation';
import UpdateProfileForm from './update-form';

export default async function MyProfile() {
  const userData = await getAuthUser();
  if (!userData) {
    redirect('auth/sign-in');
  }
  const userProfileData = await getAuthUserProfile(userData.id);
  if (!userProfileData) {
    notFound();
  }
  return <UpdateProfileForm data={userProfileData} />;
}
