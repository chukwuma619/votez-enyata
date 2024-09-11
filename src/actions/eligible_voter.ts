'use server';
import { createClient } from '@/lib/supabase/action';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { Resend } from 'resend';
import { ElectionInvitationEmail } from '@/components/email-templates/voter-invite';
import { nanoid } from 'nanoid';
import { redirect } from 'next/navigation';

const voterSchema = z.object({
  name: z
    .string({ required_error: 'name is required' })
    .min(1, 'Voters name must contain at least 1 character(s)'),
  email: z
    .string({ required_error: 'name is required' })
    .email()
    .min(1, 'Voters name must contain at least 1 character(s)'),
});

const verifySchema = z.object({
  accessCode: z
    .string()
    .min(1, 'Access code must contain at least 1 character(s)'),
});

export async function createEligibleVoter(
  election_id: string,
  prevState: unknown,
  formData: FormData,
) {
  const supabase = createClient();

  const validatedFields = voterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Create Voter.',
    };
  }

  const { name, email } = validatedFields.data;
  const { error } = await supabase
    .from('eligible_voters')
    .insert([
      {
        email: email,
        name: name,
        election_id: election_id,
        access_code: nanoid(10),
      },
    ])
    .select();
  if (error) return { message: error.message };

  revalidatePath(`/dashboard/voters/${election_id}`);
  return { closeModal: true };
}

export async function updateEligibleVoter(
  voter_id: string,
  election_id: string,
  prevState: unknown,
  formData: FormData,
) {
  const supabase = createClient();
  const validatedFields = voterSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Update voter.',
    };
  }
  const { name, email } = validatedFields.data;
  const { error } = await supabase
    .from('eligible_voters')
    .update({
      name: name,
      email: email,
    })
    .match({ access_code: voter_id, election_id: election_id })
    .select();

  if (error) return { message: error.message };

  revalidatePath(`/dashboard/voters/${election_id}`);
  return { closeModal: true };
}

export async function deleteEligibleVoter(
  access_code: string,
  election_id: string,
) {
  const supabase = createClient();

  const { error } = await supabase
    .from('eligible_voters')
    .delete()
    .match({ access_code: access_code, election_id: election_id });

  if (error) {
    console.log(error);
    return error;
  }
  revalidatePath(`/dashboard/elections/${election_id}`);
}

export async function sendMail({
  accessCode,
  electionID,
  voterName,
  creatorName,
  electionName,
  startDate,
  voterEmail,
  endDate,
  creatorEmail,
}: {
  accessCode: string;
  electionID: string;
  voterName: string;
  voterEmail: string;
  creatorName: string;
  electionName: string;
  startDate: string;
  endDate: string;
  creatorEmail: string;
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const supabase = createClient();

  const { data } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: voterEmail,
    subject: 'Participate in the Upcoming Election!',
    react: ElectionInvitationEmail({
      electionID: electionID,
      accessCode: accessCode,
      voterName: voterName,
      creatorName: creatorName,
      electionName: electionName,
      startDate: startDate,
      endDate: endDate,
      creatorEmail: creatorEmail,
    }) as React.ReactElement,
  });

  if (data && data.id) {
    const { error } = await supabase
      .from('eligible_voters')
      .update({
        msg_status: true,
      })
      .match({ access_code: accessCode, election_id: electionID })
      .select();

    if (error) return { message: error.message };

    revalidatePath(`/dashboard/voters/${electionID}`);
  }
}

export async function validateVoter(
  election_id: string,
  prevState: unknown,
  formData: FormData,
) {
  const supabase = createClient();
  const validatedFields = verifySchema.safeParse({
    accessCode: formData.get('access-code'),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: 'Missing Fields. Failed to Check voters eligibilty.',
    };
  }

  const { accessCode } = validatedFields.data;
  const { data, error } = await supabase
    .from('eligible_voters')
    .select('id')
    .match({ access_code: accessCode, election_id: election_id })
    .limit(1)
    .single();

  if (error) return { message: error.message };

  if (!data)
    return {
      message:
        'The access code you entered is not valid. Please check the code and try again. If you continue to experience issues, contact support for assistance.',
    };
  revalidatePath(`/vote/${election_id}/${accessCode}`);
  redirect(`/vote/${election_id}/${accessCode}`);
}
