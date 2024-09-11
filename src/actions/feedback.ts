'use server';
import { createClient } from '@/lib/supabase/action';
import { z } from 'zod';

const feedbackSchema = z.object({
  feedback: z.string().min(1, 'feedback must contain at least 1 character(s)'),
});
export async function createFeedback(prevState: unknown, formData: FormData) {
  const supabase = createClient();

  const validatedFields = feedbackSchema.safeParse({
    feedback: formData.get('feedback'),
  });
  console.log(formData.get('feedback'));

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Add Feedback.',
    };
  }
  const { feedback } = validatedFields.data;
  const { error } = await supabase
    .from('feedback')
    .insert([{ feedback: feedback }])
    .select();
    console.log(error);
    
  if (error) return { message: error.message };

  return { closeModal: true };
}
