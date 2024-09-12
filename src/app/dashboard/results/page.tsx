import ResultsClient from './_components/results-client';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { Divider } from '@/components/divider';
import { Suspense } from 'react';
import { getAuthUser } from '@/data/profile';
import { getUserElections } from '@/data/election';
export default async function ChooseElectionResult() {
  const userData = await getAuthUser();
  const userElections = await getUserElections(userData.id);
  return (
    <>
      <Heading>Results</Heading>
      <Text>
        Click on each election card to view detailed results and see the winning
        candidates.
      </Text>
      <div className="mt-10">
        <Divider />
        <Suspense>
          <ResultsClient elections={userElections} />
        </Suspense>
      </div>
    </>
  );
}
