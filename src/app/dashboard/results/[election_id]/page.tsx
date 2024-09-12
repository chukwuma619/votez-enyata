import { getResultData } from '@/data/vote';
import ResultClient from './_components/result-client';
import { notFound } from 'next/navigation';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { Suspense } from 'react';
import ErrorState from '@/components/error-state';
export default async function ElectionResult({
  params,
}: {
  params: { election_id: string };
}) {
  const { election, positions, candidates } = await getResultData(
    params.election_id,
  );

  if (!election) {
    notFound();
  }

  if (positions.length <= 0) {
    return (
      <ErrorState
        title="No Positions Available"
        showButton={false}
        description="There are currently no positions available to display for this election."
      />
    );
  }

  return (
    <>
      <Heading>Results</Heading>
      <div className="mt-10">
        <div className="rounded-lg pt-4 md:border">
          <div>
            <div className="text-center">
              <Heading level={1} className="uppercase">
                {election.name}
              </Heading>
              <Text>{election.description}</Text>
            </div>
          </div>
          <Suspense fallback={<p>loading...</p>}>
            {positions.length > 0 && (
              <ResultClient
                candid={candidates}
                positions={positions}
                election_id={election.id}
              />
            )}
          </Suspense>
        </div>
      </div>
    </>
  );
}
