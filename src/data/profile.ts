'use server';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export async function getAuthUser() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect('/auth/sign-in');
  return user;
}

export async function getAuthUserProfile(user_id: string) {
  const supabase = createClient();
  const { data: profile, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user_id)
    .limit(1)
    .single();
  if (error) {
    console.log(error);
    return null;
  }
  return profile;
}



export async function getAuthUserOverviewData({
  range,
}: {
  range: 'last-week' | 'last-two-week' | 'last-month';
}) {
  const user = await getAuthUser();
  const supabase = createClient();

  const { previous, current } = getRangeDates(range);

  // Fetch current elections
  const { data: elections, error: electionsError } = await supabase
    .from('elections')
    .select('*')
    .gte('created_at', current)
    .eq('creator_id', user.id);

  // Fetch previous elections
  const { data: prevElections } = await supabase
    .from('elections')
    .select('*')
    .lt('created_at', current)
    .gte('created_at', previous)
    .eq('creator_id', user.id);

  // Handle errors and null values for elections
  if (electionsError || !elections) {
    console.log(electionsError);

    return {
      totalElections: 0,
      activeElections: 0,
      totalRegVoters: 0,
      voterTurnoutRate: 0,
      totalElectionsChange: '0%',
      totalRegVotersChange: '0%',
      voterTurnoutRateChange: '0%',
    };
  }

  const electionIds = elections.map((election) => election.id);

  // Fetch current voters and votes
  const { data: voters, error: votersError } = await supabase
    .from('eligible_voters')
    .select('*')
    .in('election_id', electionIds);

  const { data: votes, error: votesError } = await supabase
    .from('votes')
    .select('*')
    .in('election_id', electionIds);

  // Handle errors for voters and votes
  if (votersError || votesError) {
    console.log(votersError || votesError);

    return {
      totalElections: elections.length,
      activeElections: elections.filter((value) => value.status === 'active')
        .length,
      totalRegVoters: 0,
      voterTurnoutRate: 0,
      totalElectionsChange: '0%',
      totalRegVotersChange: '0%',
      voterTurnoutRateChange: '0%',
    };
  }

  // Calculate current statistics
  const totalElections = elections.length;
  const activeElections = elections.filter(
    (value) => value.status === 'active',
  ).length;
  const totalRegVoters = voters.length;
  const voterTurnoutRate = voters.length
    ? Math.floor((votes.length / voters.length) * 100)
    : 0;

  // Handle possible null values for previous elections
  const totalPrevElections = prevElections ? prevElections.length : 0;
  const prevElectionIds = prevElections
    ? prevElections.map((election) => election.id)
    : [];

  // Fetch previous voters and votes
  const { data: prevVoters } = await supabase
    .from('eligible_voters')
    .select('*')
    .in('election_id', prevElectionIds);

  const { data: prevVotes } = await supabase
    .from('votes')
    .select('*')
    .in('election_id', prevElectionIds);

  // Handle possible null values for previous voters and votes
  const totalPrevRegVoters = prevVoters ? prevVoters.length : 0;
  const prevVoterTurnoutRate = totalPrevRegVoters
    ? Math.floor(
        ((prevVotes ? prevVotes.length : 0) / totalPrevRegVoters) * 100,
      )
    : 0;

  // Calculate percentage changes
  const totalElectionsChange = totalPrevElections
    ? (
        ((totalElections - totalPrevElections) / totalPrevElections) *
        100
      ).toFixed(1) + '%'
    : '0%';
  const totalRegVotersChange = totalPrevRegVoters
    ? (
        ((totalRegVoters - totalPrevRegVoters) / totalPrevRegVoters) *
        100
      ).toFixed(1) + '%'
    : '0%';
  const voterTurnoutRateChange = prevVoterTurnoutRate
    ? (
        ((voterTurnoutRate - prevVoterTurnoutRate) / prevVoterTurnoutRate) *
        100
      ).toFixed(1) + '%'
    : '0%';

  return {
    totalElections,
    activeElections,
    totalRegVoters,
    voterTurnoutRate,
    totalElectionsChange: formatPercentageChange(totalElectionsChange),
    totalRegVotersChange: formatPercentageChange(totalRegVotersChange),
    voterTurnoutRateChange: formatPercentageChange(voterTurnoutRateChange),
  };
}

function formatPercentageChange(change: string): string {
  const value = parseFloat(change);
  if (isNaN(value)) {
    return '0%';
  }
  return value >= 0 ? `+${change}` : change;
}

function getRangeDates(range: 'last-week' | 'last-two-week' | 'last-month') {
  const now = new Date();
  let previous, current;

  switch (range) {
    case 'last-week':
      previous = new Date(now.setDate(now.getDate() - 14)).toISOString();
      current = new Date(now.setDate(now.getDate() - 7)).toISOString();
      break;
    case 'last-two-week':
      previous = new Date(now.setDate(now.getDate() - 28)).toISOString();
      current = new Date(now.setDate(now.getDate() - 14)).toISOString();
      break;
    case 'last-month':
      previous = new Date(now.setMonth(now.getMonth() - 2)).toISOString();
      current = new Date(now.setMonth(now.getMonth() - 1)).toISOString();
      break;
    default:
      previous = current = now.toISOString();
      break;
  }

  return { previous, current };
}
