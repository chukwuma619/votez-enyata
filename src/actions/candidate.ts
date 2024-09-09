'use server';
import { createClient } from '@/lib/supabase/action';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { getAuthUser } from '@/data/profile';
const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];
const candidateSchema = z
  .object({
    photo: z.instanceof(File, { message: 'candidate photo is required' }),
    name: z
      .string({ required_error: 'name is required' })
      .min(1, 'Candidate name must contain at least 1 character(s)'),
    bio: z.string().optional(),
  })
  .refine((data) => data.photo.size <= MAX_UPLOAD_SIZE, {
    message: 'Photo size must be less than 3MB',
    path: ['photo'],
  })
  .refine((data) => ACCEPTED_FILE_TYPES.includes(data.photo.type), {
    message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
    path: ['photo'],
  });

const updateSchema = z
  .object({
    photo: z
      .instanceof(File)
      .refine(
        (file) =>
          (file.size === 0 && file.type === 'application/octet-stream') ||
          (file.size > 0 && file.type !== 'application/octet-stream'),
        {
          message:
            'Invalid file. Please upload a valid image or leave the field empty.',
          path: ['photo'],
        },
      )
      .optional(),
    name: z
      .string({ required_error: 'name is required' })
      .min(1, 'Candidate name must contain at least 1 character(s)'),
    bio: z.string().optional(),
  })
  .refine(
    (data) =>
      !data.photo ||
      (data.photo.size === 0 &&
        data.photo.type === 'application/octet-stream') ||
      data.photo.size <= MAX_UPLOAD_SIZE,
    {
      message: 'Photo size must be less than 3MB',
      path: ['photo'],
    },
  )
  .refine(
    (data) =>
      !data.photo ||
      (data.photo.size === 0 &&
        data.photo.type === 'application/octet-stream') ||
      ACCEPTED_FILE_TYPES.includes(data.photo.type),
    {
      message: 'Only .jpg, .jpeg, .png and .webp formats are supported.',
      path: ['photo'],
    },
  );

export async function createCandidate(
  position_id: string,
  election_id: string,
  prevState: any,
  formData: FormData,
) {
  const supabase = createClient();

  const validatedFields = candidateSchema.safeParse({
    name: formData.get('name'),
    photo: formData.get('photo'),
    bio: formData.get('bio'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Election.',
    };
  }

  const { name, bio, photo } = validatedFields.data;

  console.log(name, bio, photo);

  const filePath = `${crypto.randomUUID()}-${photo.name}`;
  const { error: uploadError } = await supabase.storage
    .from('candidate_pics')
    .upload(filePath, photo);
  console.log(uploadError);

  if (uploadError) {
    return { message: uploadError.message };
  }

  const { data } = await supabase.storage
    .from('candidate_pics')
    .getPublicUrl(filePath);

  const { error } = await supabase
    .from('candidates')
    .insert([
      {
        position_id: position_id,
        name: name,
        bio: bio,
        photo_url: data.publicUrl,
      },
    ])
    .select();

  if (error) {
    return { message: error.message };
  }

  revalidatePath(`/dashboard/elections/${election_id}/${position_id}`);
  return { closeModal: true };
}

export async function updateCandidate(
  candidate_id: string,
  position_id: string,
  election_id: string,
  prevState: any,
  formData: FormData,
) {
  const supabase = createClient();

  const validatedFields = updateSchema.safeParse({
    name: formData.get('name'),
    photo: formData.get('photo'),
    bio: formData.get('bio'),
  });


  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Election.',
    };
  }

  const { name, bio, photo } = validatedFields.data;

  console.log(name, bio, photo);

  if (photo && photo.size > 0 && photo.type !== 'application/octet-stream') {
    const filePath = `${crypto.randomUUID()}-${photo.name}`;
    const { error: uploadError } = await supabase.storage
      .from('candidate_pics')
      .upload(filePath, photo);

    if (uploadError) {
      return { message: uploadError.message };
    }

    const { data } = await supabase.storage
      .from('candidate_pics')
      .getPublicUrl(filePath);

    const { error } = await supabase
      .from('candidates')
      .update({
        name: name,
        bio: bio,
        photo_url: data.publicUrl,
      })
      .eq('id', candidate_id)
      .select();

    if (error) {
      return { message: error.message };
    }
  } else {
    const { error } = await supabase
      .from('candidates')
      .update({
        name: name,
        bio: bio,
      })
      .eq('id', candidate_id)
      .select();

    if (error) {
      return { message: error.message };
    }
  }

  revalidatePath(`/dashboard/elections/${election_id}/${position_id}`);
  return { closeModal: true };
}

export async function deleteCandidate(
  candidate_id: string,
  position_id: string,
  election_id: string,
) {
  const supabase = createClient();

  const { error } = await supabase
    .from('candidates')
    .delete()
    .match({ id: candidate_id, position_id: position_id });

  if (error) {
    console.log(error);
    return error;
  }
  revalidatePath(`/dashboard/elections/${election_id}/${position_id}`);
}
