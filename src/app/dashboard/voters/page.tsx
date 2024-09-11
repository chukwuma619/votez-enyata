import { getUserElections } from '@/data/election';
import { getAuthUser } from '@/data/profile';
import VotersClient from './_components/voters-client';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { Divider } from '@/components/divider';
import { Suspense } from 'react';
export default async function ChooseElectionVoter() {
  const userData = await getAuthUser();
  const userElections = await getUserElections(userData.id);
  return (
    <>
      <>
        <Heading>Voters</Heading>
        <Text>Click on each election card to view eligible voters</Text>
        <div className="mt-10">
          <Divider />
          <Suspense fallback={<p>loading</p>}>
            <VotersClient elections={userElections} />
          </Suspense>
        </div>
      </>
    </>
  );
}
