'use server';
import { createClient } from '@/lib/supabase/server';
import { Tables } from '@/types/database.types';
import { redirect } from 'next/navigation';

export async function getVotingData(election_id: string, voter_id: string) {
  const supabase = createClient();
  const [
    { data: election, error: electionError },
    { data: voter, error: voterError },
  ] = await Promise.all([
    supabase
      .from('elections')
      .select('*')
      .eq('id', election_id)
      .limit(1)
      .single(),
    supabase
      .from('eligible_voters')
      .select('id')
      .match({ election_id: election_id, access_code: voter_id })
      .limit(1)
      .single(),
  ]);

  if (electionError || voterError) {
    console.error(electionError || voterError);
    return { election: null, voter: null };
  }

  const { data: positions, error: positionsError } = await supabase
    .from('positions')
    .select('id, name')
    .eq('election_id', election_id);

  if (positionsError) {
    console.error(positionsError);
    return { election, voter, positions: [], candidates: {}, votesStatus: {} };
  }

  const positionIds = positions.map((position) => position.id);
  const { data: candidates, error: candidatesError } = await supabase
    .from('candidates')
    .select('*')
    .in('position_id', positionIds);

  if (candidatesError) {
    console.error(candidatesError);
    return { election, voter, positions, candidates: {}, votesStatus: {} };
  }

  const { data: votes, error: votesError } = await supabase
    .from('votes')
    .select('position_id, candidate_id')
    .match({ election_id: election_id, voter_access_code: voter_id });

  if (votesError) {
    console.error(votesError);
    return {
      election,
      voter,
      positions,
      candidates: groupByPosition(candidates),
      votesStatus: {},
    };
  }

  const voteStatus: {
    [key: string]: {
      status: boolean;
      candidate_id?: string;
    };
  } = {};
  votes.forEach((vote) => {
    voteStatus[vote.position_id] = {
      status: true,
      candidate_id: vote.candidate_id,
    };
  });

  positions.forEach((position) => {
    if (!voteStatus[position.id]) {
      voteStatus[position.id] = { status: false };
    }
  });

  return {
    election,
    voter,
    positions,
    candidates: groupByPosition(candidates),
    votesStatus: voteStatus,
  };
}

export async function getResultData(election_id: string) {
  const supabase = createClient();

  // Fetch election details
  const { data: election, error: electionError } = await supabase
    .from('elections')
    .select('*')
    .eq('id', election_id)
    .single();

  if (electionError) {
    console.error(electionError);
    return { election: null, positions: [], candidates: {} };
  }

  // Fetch positions associated with the election
  const { data: positions, error: positionsError } = await supabase
    .from('positions')
    .select('id, name')
    .eq('election_id', election_id);

  if (positionsError) {
    console.error(positionsError);
    return { election, positions: [], candidates: {} };
  }

  // Fetch candidates associated with the positions
  const positionIds = positions.map((position) => position.id);
  const { data: candidates, error: candidatesError } = await supabase
    .from('candidates')
    .select('*')
    .in('position_id', positionIds);

  if (candidatesError) {
    console.error(candidatesError);
    return { election, positions, candidates: {} };
  }

  // Fetch votes for the election
  const { data: votes, error: votesError } = await supabase
    .from('votes')
    .select('position_id, candidate_id')
    .eq('election_id', election_id);

  if (votesError) {
    console.error(votesError);
    return { election, positions, candidates: {} };
  }

  // Aggregate votes count for each candidate
  const voteCounts = votes.reduce(
    (acc, vote) => {
      if (!acc[vote.candidate_id]) {
        acc[vote.candidate_id] = 0;
      }
      acc[vote.candidate_id]++;
      return acc;
    },
    {} as { [key: string]: number },
  );

  // Group candidates by position_id and add vote count
  const candidatesByPosition = candidates.reduce(
    (acc, candidate) => {
      if (!acc[candidate.position_id]) {
        acc[candidate.position_id] = [];
      }
      acc[candidate.position_id].push({
        ...candidate,
        voteCount: voteCounts[candidate.id] || 0,
      });
      return acc;
    },
    {} as { [key: string]: (Tables<'candidates'> & { voteCount: number })[] },
  );

  return {
    election,
    positions,
    candidates: candidatesByPosition,
  };
}

function groupByPosition(candidates: Tables<'candidates'>[]): {
  [key: string]: Tables<'candidates'>[];
} {
  return candidates.reduce(
    (acc, candidate) => {
      if (!acc[candidate.position_id]) {
        acc[candidate.position_id] = [];
      }
      acc[candidate.position_id].push(candidate);
      return acc;
    },
    {} as { [key: string]: Tables<'candidates'>[] },
  );
}
