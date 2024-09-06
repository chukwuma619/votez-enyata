import { notFound } from 'next/navigation';
import { getVotingData } from '@/data/vote';
import InstructionButton from './_components/button';
import { Button } from '@/components/button';
import { Heading } from '@/components/heading';
import { Text } from '@/components/text';
import { convertDateTime } from '@/lib/utils';
import { ClockIcon } from '@heroicons/react/24/outline';
import VotingForm from './_components/voting-form';
import ErrorState from '@/components/error-state';

export default async function ElectionVoting({
  params,
}: {
  params: { election_id: string; voter_id: string };
}) {
  const { election, positions, voter, votesStatus, candidates } =
    await getVotingData(params.election_id, params.voter_id);

  if (!election || !voter) {
    notFound();
  }

  const now = new Date();
  const startDateime = new Date(election.start_datetime);
  const endDateTime = new Date(election.end_datetime);

  if (now < startDateime)
    return (
      <ErrorState
        title="Voting Hasn't Started Yet"
        description="The voting period for this election hasn't begun. Please check back once the election starts. Thank you for your patience and participation!"
      />
    );

  if (now > endDateTime)
    return (
      <ErrorState
        title="Voting Has Ended"
        description="The voting period for this election has concluded. Voting is no longer available. Thank you for your interest and participation!"
      />
    );
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
                <div className="mt-4 flex flex-col-reverse items-center justify-between px-4 md:flex-row">
                  <InstructionButton />

                  <Button outline disabled className="border-none !font-normal">
                    <ClockIcon /> {convertDateTime(election.end_datetime)}
                  </Button>
                </div>
              </div>
            </div>
            {positions.length > 0 && (
              <VotingForm
                positions={positions}
                candid={candidates}
                election_id={params.election_id}
                voter_id={params.voter_id}
                votes_status={votesStatus}
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
