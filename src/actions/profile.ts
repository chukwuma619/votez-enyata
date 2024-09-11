'use server';
import { createClient } from '@/lib/supabase/action';
import { z } from 'zod';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
const UserSchema = z.object({
  first_name: z
    .string({ required_error: 'first name is required' })
    .min(1, 'First name must contain at least 1 character(s)'),
  last_name: z
    .string({ required_error: 'last name is required' })
    .min(1, 'Last name must contain at least 1 character(s)'),
  email: z
    .string({ required_error: 'email is required' })
    .min(1, 'Email must contain at least 1 character(s)'),
  password: z
    .string({ required_error: 'password is required' })
    .min(1, 'Password must contain at least 1 character(s)'),
});

const LoginFormSchema = UserSchema.omit({ first_name: true, last_name: true });

const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB
const ACCEPTED_FILE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
];

const updateProfileSchema = z
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
    first_name: z
      .string({ required_error: 'first name is required' })
      .min(1, 'First name must contain at least 1 character(s)'),
    last_name: z
      .string({ required_error: 'last name is required' })
      .min(1, 'Last name must contain at least 1 character(s)'),
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
export async function registerUser(prevState: unknown, formData: FormData) {
  const validatedFields = UserSchema.safeParse({
    first_name: formData.get('first_name'),
    last_name: formData.get('last_name'),
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Register user.',
    };
  }

  const { first_name, last_name, email, password } = validatedFields.data;

  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email: email,
    password: password,
    options: {
      data: {
        first_name: first_name,
        last_name: last_name,
      },
    },
  });

  if (error) return { message: error.message };
  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function signInWithEmail(prevState: unknown, formData: FormData) {
  const validatedFields = LoginFormSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to login.',
    };
  }

  const { email, password } = validatedFields.data;

  const supabase = createClient();

  const { error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });

  if (error) return { message: error.message };

  revalidatePath('/dashboard');
  redirect('/dashboard');
}

export async function updateProfile(
  user_id: string,
  prevState: unknown,
  formData: FormData,
) {
  const validatedFields = updateProfileSchema.safeParse({
    first_name: formData.get('first-name'),
    last_name: formData.get('last-name'),
    photo: formData.get('photo'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to update profile.',
    };
  }

  const { first_name, last_name, photo } = validatedFields.data;

  const supabase = createClient();

  if (photo && photo.size > 0 && photo.type !== 'application/octet-stream') {
    const filePath = `${crypto.randomUUID()}-${photo.name}`;
    const { error: uploadError } = await supabase.storage
      .from('profile_pics')
      .upload(filePath, photo);

    if (uploadError) {
      return { message: uploadError.message };
    }

    const { data } = await supabase.storage
      .from('profile_pics')
      .getPublicUrl(filePath);

    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: first_name,
        last_name: last_name,
        photo_url: data.publicUrl,
      })
      .eq('id', user_id)
      .select();

    if (error) {
      return { message: error.message };
    }
  } else {
    const { error } = await supabase
      .from('profiles')
      .update({
        first_name: first_name,
        last_name: last_name,
      })
      .eq('id', user_id)
      .select();

    if (error) {
      return { message: error.message };
    }
  }

  revalidatePath(`/dashboard`, 'layout');
  redirect('/dashboard');
}

export async function logoutUser() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut({ scope: 'local' });
  if (error) {
    console.log(error);
    return error;
  }
  redirect('/');
}
