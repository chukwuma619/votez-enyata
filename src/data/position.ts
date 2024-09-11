'use server';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import { getElection } from './election';
export async function getElectionPositions(election_id: string) {
  const isElectionValid = await getElection(election_id);
  const supabase = createClient();

  const { data: positions, error } = await supabase
    .from('positions')
    .select('*')
    .eq('election_id', isElectionValid.id);

  if (error) {
    console.log(error);
    return [];
  }

  return positions ? positions : [];
}

export async function getPosition(position_id: string) {
  const supabase = createClient();

  const { data: position, error } = await supabase
    .from('positions')
    .select('*')
    .eq('id', position_id)
    .limit(1)
    .single();

  if (error) {
    console.log(error);
    notFound();
  }

  if (!position) notFound();

  return position;
}
