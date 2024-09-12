import { getFilteredElectionEligibleVoters } from '@/data/eligible_voter';
import VoterTableClient from './voter-table-client';
import { Tables } from '@/types/database.types';

export default async function VoterTable({
  query,
  currentPage,
  election_id,
  election_data,
  creator_profile,
}: {
  query: string;
  currentPage: number;
  election_id: string;
  election_data: Tables<'elections'>;
  creator_profile: Tables<'profiles'>;
}) {
  const voters = await getFilteredElectionEligibleVoters(
    query,
    currentPage,
    election_id,
  );

  return (
    <>
      <VoterTableClient
        election_data={election_data}
        creator_profile={creator_profile}
        voters={voters}
      />
    </>
  );
}
