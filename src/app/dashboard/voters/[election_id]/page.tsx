import { getElectionVoters } from '@/data/query';
import { getVotersPages } from '@/data/eligible_voter';
import { Heading } from '@/components/heading';
import AddVoter from './_components/button';
import Search from './_components/search';
import { Suspense } from 'react';
import VoterTable from './_components/voter-table';
import VoterPagination from './_components/voter-pagination';
import { getElection } from '@/data/election';
import { getAuthUserProfile } from '@/data/profile';

export default async function EligibleVoterPage({
  searchParams,
  params,
}: {
  params: { election_id: string };
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  const totalPages = await getVotersPages(query);
  const electionData = await getElection(params.election_id)
  const creatorProfile = await getAuthUserProfile(electionData.creator_id)
  console.log(creatorProfile);
  
  return (


    <>
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-sm:w-full sm:flex-1">
          <Heading>Voters</Heading>

          <div className="mt-4 flex max-w-xl gap-4">
            <div className="flex-1">
              <Search placeholder="Search voters" />
            </div>
          </div>
        </div>
        <AddVoter election_id={params.election_id} />
      </div>

      <Suspense key={query + currentPage} fallback={<p>Loading....</p>}>
        <VoterTable
          election_id={params.election_id}
          query={query}
          election_data={electionData}
          creator_profile={creatorProfile!}
          currentPage={currentPage}
        />
      </Suspense>
      <VoterPagination totalPages={totalPages} />
    </>
  );
}

{
  /* {voters.length > 0 ? (
        <></>
      ) : (
        <div className="mt-36 flex size-full items-center justify-center">
          <div className="text-center">
            <Subheading level={2} className="mt-2">
              No Eligible Voter
            </Subheading>

            <Text className="mt-1">Get started by adding a new voter.</Text>
          </div>
        </div>
      )} */
}
