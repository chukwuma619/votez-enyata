'use server';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { getAuthUser } from './profile';

export async function getUserElections(user_id: string) {
  const supabase = createClient();

  let { data: elections, error } = await supabase
    .from('elections')
    .select('*')
    .eq('creator_id', user_id);

  if (error) {
    console.log(error);
    return [];
  }

  return elections ? elections : [];
}

export async function hasUserExhustedFreePlan() {
  const user = await getAuthUser();
  const supabase = createClient();

  let { data: elections, error } = await supabase
    .from('elections')
    .select('*')
    .match({ creator_id: user.id, plan: 'free' })
    .limit(1)
    .single();

  if (error) {
    if (error.details === 'The result contains 0 rows') {
      return false;
    }
    return true;
  }

  return elections ? true : false;
}

export async function getElection(election_id: string) {
  const supabase = createClient();

  let { data: election, error } = await supabase
    .from('elections')
    .select('*')
    .eq('id', election_id)
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    notFound();
  }

  if (!election) notFound();

  return election;
}

export async function getUserUpcomingElections(user_id: string) {
  const supabase = createClient();

  let { data: elections, error } = await supabase
    .from('elections')
    .select('*')
    .match({ creator_id: user_id, status: 'pending' });

  if (error) {
    console.log(error);
    return [];
  }

  return elections ? elections : [];
}

export async function updateElectionStatus() {
  const supabase = createClient();
  const now = new Date().toISOString();

  // Fetch elections that are scheduled to start now
  const { data: elections, error: electionsError } = await supabase
    .from('elections')
    .select('*')
    .eq('start_datetime', now);

  if (electionsError) {
    console.error('Error fetching elections:', electionsError);
    return;
  }

  if (elections && elections.length > 0) {
    for (const election of elections) {
      const { id } = election;

      // Update the status of the election
      const { error: updateError } = await supabase
        .from('elections')
        .update({ status: 'active' })
        .eq('id', id);

      if (updateError) {
        console.error('Error updating election status:', updateError);
      } else {
        console.log(`Election with ID ${id} has been activated.`);
      }
    }
  } else {
    console.log('No elections to update at this time.');
  }
}
