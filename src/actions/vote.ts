'use server';
import { createClient } from '@/lib/supabase/action';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

const voteSchema = z.object({
  candidate_id: z.string(),
  voter_id: z.string(),
  position_id: z.string(),
  election_id: z.string(),
});

export async function castVote(
  vot_id: string,
  posi_id: string,
  elect_id: string,
  prevState: any,
  formData: FormData,
) {
  const supabase = createClient();

  const validatedFields = voteSchema.safeParse({
    candidate_id: formData.get('candidate_id'),
    election_id: elect_id,
    position_id: posi_id,
    voter_id: vot_id,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Cast vote.',
    };
  }
  const { candidate_id, election_id, position_id, voter_id } =
    validatedFields.data;

  const { data: votes, error: votesError } = await supabase
    .from('votes')
    .select('id')
    .match({
      voter_id: voter_id,
      candidate_id: candidate_id,
      position_id: position_id,
      election_id: election_id,
    })
    .limit(1)
    .single();

  if (votes) {
    return { message: 'duplicate voting is not allowed' };
  }

  const { error } = await supabase
    .from('votes')
    .insert([
      {
        voter_access_code: voter_id,
        candidate_id: candidate_id,
        position_id: position_id,
        election_id: election_id,
      },
    ])
    .select();
  if (error) return { message: error.message };

  return {
    change_status: { pos: position_id, data: { status: true, candidate_id } },
  };
}
