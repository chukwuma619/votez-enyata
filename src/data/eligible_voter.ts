'use server';
import { createClient } from '@/lib/supabase/server';
import { getElection } from './election';
const ITEMS_PER_PAGE = 6;
export async function getFilteredElectionEligibleVoters(
  query: string,
  currentPage: number,
  election_id: string,
) {
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;
  const isElectionValid = await getElection(election_id);
  const supabase = createClient();

  const { data: voters, error } = await supabase
    .from('eligible_voters')
    .select('*')
    .eq('election_id', isElectionValid.id)
    .ilike('name', `%${query}%`)
    .ilike('email', `%${query}%`)
    .range(offset, offset + ITEMS_PER_PAGE);

  if (error) {
    console.log(error);
    return [];
  }

  return voters ? voters : [];
}

export async function getVotersPages(query: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from('eligible_voters')
    .select('*', { count: 'exact', head: true })
    .ilike('name', `%${query}%`)
    .ilike('email', `%${query}%`);

  if (error) {
    console.log(error);
    throw new Error('Failed to fetch total number of voter.');
  }

  if (count) {
    const totalPages = Math.ceil(Number(count) / ITEMS_PER_PAGE);
    return totalPages;
  }
  return 0;
}
