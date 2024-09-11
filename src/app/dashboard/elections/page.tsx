import ElectionClient from './_components/elections-client';
import type { Metadata } from 'next';
import { getAuthUser } from '@/data/profile';
import { getUserElections, hasUserExhustedFreePlan } from '@/data/election';
import { getCurrentRate } from '@/actions/payment';
export const metadata: Metadata = {
  title: 'Elections',
};
export default async function DashboardElections() {
  const userData = await getAuthUser();
  const userElections = await getUserElections(userData.id);
  const hasUseFreePlan = await hasUserExhustedFreePlan();
  const currentRate = await getCurrentRate();


  return (
    <>
      <ElectionClient
        conversionRate={currentRate.conversion_rate}
        hasUseFreePlan={hasUseFreePlan}
        userEmail={userData.email!}
        elections={userElections}
      />
    </>
  );
}
