import {
  getCandidatesOfPosition,
  getElection,
  getPositionsOfElection,
  getTotalVotesForCandidate,
} from '@/data/query';
import { notFound } from 'next/navigation';
import type { CandidateType } from '@/data/placeholder';
import ResultClient from './_components/result-client';
import { getResultData } from '@/data/vote';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import ErrorState from '@/components/error-state';
export default async function ElectionResultChecker({
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
        description="There are currently no positions available to display for this election. Please check back later or contact the election organizer for more information."
      />
    );
  }
  return (
    <>
      <div className="flex min-h-svh w-full justify-center px-2 py-2 focus:outline-0 sm:px-6 sm:py-8 lg:p-8">
        <div className="row-start-2 w-full min-w-0 rounded-t-3xl bg-white p-[--gutter] shadow-lg ring-1 ring-zinc-950/10 [--gutter:theme(spacing.4)] sm:mb-auto sm:max-w-2xl sm:rounded-2xl lg:[--gutter:theme(spacing.6)] dark:bg-zinc-900 dark:ring-white/10 forced-colors:outline">
          <div className="pt-4 md:border">
            <div>
              <div className="text-center">
                <Heading level={1} className="uppercase">
                  {election.name}
                </Heading>
                <Text>{election.description}</Text>
              </div>
            </div>
            {positions.length > 0 && (
              <ResultClient
                election_id={params.election_id}
                positions={positions}
                candid={candidates}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
