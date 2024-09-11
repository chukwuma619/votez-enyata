import PositionsClient from './_components/positions-client';
import { getElectionPositions } from '@/data/position';
export default async function DashboardPositions({
  params,
}: {
  params: { election_id: string };
}) {
  const positions = await getElectionPositions(params.election_id);

  console.log(positions);

  return (
    <>
      <PositionsClient positions={positions} election_id={params.election_id} />
    </>
  );
}
