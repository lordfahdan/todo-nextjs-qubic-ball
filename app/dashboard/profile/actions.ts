'use server';

import { fetchUpdateUser } from '@/utils/api';
import { updateProfileSchema } from '@/utils/schema/profile';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function updateProfile(prevState: any, formData: FormData) {
  const token = cookies().get('jxx')? `Bearer ${cookies().get('jxx')?.value}` : ''

  const payload = {
    name: formData.get('name') as string,
    old_password: formData.get('old_password') as string,
    new_password: formData.get('new_password') as string,
  };

  const result = updateProfileSchema.safeParse(payload);
  if (!result.success) {
    const formatted = result.error.format();

    return {
      message: 'Form input error!',
      errors: {
        name: formatted.name?._errors[0],
        old_password: formatted.old_password?._errors[0],
        new_password: formatted.new_password?._errors[0],
      },
      status: false
    };
  }
  
  try {
    await fetchUpdateUser({
      name: payload.name,
      old_password: payload.old_password,
      new_password: payload.new_password,
    }, {
      headers: {
        Authorization: token
      }
    });

    revalidatePath('/dashboard');
    revalidatePath('/dashboard/profile');
    return { message: 'Update profile successfully!', status: true };
  } catch (e: any) {
    return { message: `Update profile failed!`, status: false, errors: e.response?.data?.errors };
  }
}
