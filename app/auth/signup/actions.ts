'use server';

import { fetchSignup } from '@/utils/api';
import { signUpSchema } from '@/utils/schema/auth';
import { revalidatePath } from 'next/cache';

export async function signUp(prevState: any, formData: FormData) {
  const payload = {
    username: formData.get('username') as string,
    name: formData.get('name') as string,
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    confirm_password: formData.get('confirm_password') as string,
  };

  const result = signUpSchema.safeParse(payload);
  if (!result.success) {
    const formatted = result.error.format();

    return {
      message: 'Form input error!',
      errors: {
        username: formatted.username?._errors[0],
        name: formatted.name?._errors[0],
        email: formatted.email?._errors[0],
        password: formatted.password?._errors[0],
        confirm_password: formatted.confirm_password?._errors[0],
      },
      status: false
    };
  }
  
  try {
    await fetchSignup({
      username: payload.username,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      confirm_password: payload.confirm_password,
    });

    revalidatePath('/auth/signin');
    formData.forEach((_, key) => {
      formData.delete(key)
    })
    return { message: 'Sign Up successfully!', status: true };
  } catch (e: any) {
    return { message: `Sign Up failed!`, status: false, errors: e.response?.data?.errors };
  }
}
