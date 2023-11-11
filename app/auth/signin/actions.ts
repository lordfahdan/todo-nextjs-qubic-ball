'use server';

import { SignIpResponseType } from '@/interfaces/auth';
import { fetchSignin } from '@/utils/api';
import { signInSchema } from '@/utils/schema/auth';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function signIn(prevState: any, formData: FormData) {
  const payload = signInSchema.parse({
    username_or_email: formData.get('username'),
    password: formData.get('password'),
  });

  try {
    const { data }: { data: SignIpResponseType } = await fetchSignin({
      username_or_email: payload.username_or_email,
      password: payload.password,
    });

    cookies().set('jxx', data.token);

    revalidatePath('/auth/signin');
    return { message: 'Sign In successfully!', status: true };
  } catch (e: any) {
    return { message: `${e?.response?.data?.errors}`, status: false };
  }
}
