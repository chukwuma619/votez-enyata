'use server';
import { createClient } from '@/lib/supabase/server';
import { getPosition } from './position';
export async function getCandidatesOfPosition(position_id: string) {
  const position = await getPosition(position_id);
  const supabase = createClient();

  const { data: candidates, error } = await supabase
    .from('candidates')
    .select('*')
    .eq('position_id', position.id);

  if (error) {
    console.log(error);
    return [];
  }

  return candidates ? candidates : [];
}
