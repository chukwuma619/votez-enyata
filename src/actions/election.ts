'use server';
import { createClient } from '@/lib/supabase/action';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getAuthUser } from '@/data/profile';

const regex = new RegExp(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/);
const electionSchema = z
  .object({
    name: z
      .string({ required_error: 'name is required' })
      .min(1, 'Election name must contain at least 1 character(s)'),
    description: z.string().optional(),
    start_datetime: z.string().regex(regex, 'Invalid datetime'),
    end_datetime: z.string().regex(regex, 'Invalid datetime'),
  })
  .refine(
    (data) => new Date(data.end_datetime) > new Date(data.start_datetime),
    {
      message: 'End date and time must be after the start date and time',
      path: ['end_datetime'],
    },
  );

export async function createElection(prevState: any, formData: FormData) {
  const supabase = createClient();
  const user = await getAuthUser();

  const validatedFields = electionSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    start_datetime: formData.get('start_datetime'),
    end_datetime: formData.get('end_datetime'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Election.',
    };
  }

  const { description, name, start_datetime, end_datetime } =
    validatedFields.data;

  const { error } = await supabase
    .from('elections')
    .insert([
      {
        name: name,
        description: description,
        start_datetime: start_datetime,
        end_datetime: end_datetime,
        creator_id: user.id,
      },
    ])
    .select();
  if (error) return { message: error.message };

  revalidatePath('/dashboard/elections');
  return { closeModal: true };
}

export async function updateElection(
  election_id: string,
  prevState: any,
  formData: FormData,
) {
  const supabase = createClient();
  const user = await getAuthUser();

  const validatedFields = electionSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
    start_datetime: formData.get('start_datetime'),
    end_datetime: formData.get('end_datetime'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update Election.',
    };
  }
  const { description, name, start_datetime, end_datetime } =
    validatedFields.data;
  const { data, error } = await supabase
    .from('elections')
    .update({
      name: name,
      description: description,
      start_datetime: start_datetime,
      end_datetime: end_datetime,
    })
    .match({ id: election_id, creator_id: user.id })
    .select();

  if (error) return { message: error.message };

  revalidatePath('/dashboard/elections');
  return { closeModal: true };
}

export async function deleteElection(election_id: string) {
  const supabase = createClient();
  const user = await getAuthUser();

  const { error } = await supabase
    .from('elections')
    .delete()
    .match({ id: election_id, creator_id: user.id });

  if (error) {
    console.log(error);
    return error;
  }
  revalidatePath('/dashboard/elections');
}

export async function updatePaymentStatus(
  election_id: string,
  reference: string,
) {
  const { data, error } = await verifyPayment({ reference: reference });

  if (error) console.error(error);
  if (data?.data.data.status) {
    const supabase = createClient();

    const { error } = await supabase
      .from('elections')
      .update({
        has_paid: true,
      })
      .match({ id: election_id });
    revalidatePath('/dashboard/elections');
    if (error) console.error(error);
  }
}
