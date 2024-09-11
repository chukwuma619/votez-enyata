'use server';
import { createClient } from '@/lib/supabase/action';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';


const positionSchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(1, 'Election name must contain at least 1 character(s)'),
});

export async function createPosition(
  election_id: string,
  prevState: unknown,
  formData: FormData,
) {
  const supabase = createClient();

  const validatedFields = positionSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Position.',
    };
  }

  const { name } = validatedFields.data;
  const { error } = await supabase
    .from('positions')
    .insert([
      {
        name: name,
        election_id: election_id,
      },
    ])
    .select();
  if (error) return { message: error.message };

  revalidatePath(`/dashboard/elections/${election_id}`);
  return { closeModal: true };
}

export async function updatePosition(
  position_id: string,
  election_id: string,
  prevState: unknown,
  formData: FormData,
) {
  const supabase = createClient();
  const validatedFields = positionSchema.safeParse({
    name: formData.get('name'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Election.',
    };
  }
  const { name } = validatedFields.data;
  const { error } = await supabase
    .from('positions')
    .update({
      name: name,
    })
    .match({ id: position_id, election_id: election_id })
    .select();

  if (error) return { message: error.message };

  revalidatePath(`/dashboard/elections/${election_id}`);
  return { closeModal: true };
}

export async function deletePosition(position_id: string, election_id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('positions')
    .delete()
    .match({ id: position_id, election_id: election_id });

  if (error) {
    console.log(error);
    return error;
  }
  revalidatePath(`/dashboard/elections/${election_id}`);
}
