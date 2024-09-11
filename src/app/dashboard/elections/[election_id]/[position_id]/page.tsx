import { getCandidatesOfPosition } from '@/data/candidate';
import CandidateClient from './_components/candidates-client';

export default async function DashboardCandidate({
  params,
}: {
  params: { election_id: string; position_id: string };
}) {
  const candidates = await getCandidatesOfPosition(params.position_id);
  console.log(candidates);

  return (
    <>
      <CandidateClient
        candidates={candidates}
        position_id={params.position_id}
        election_id={params.election_id}
      />
    </>
  );
}
