'use server';

import { fetchTaskUpdateById } from '@/utils/api';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function editTodo(prevState: any, formData: FormData) {
  const token = cookies().get('jxx')
    ? `Bearer ${cookies().get('jxx')?.value}`
    : '';

  const payload = {
    name: formData.get('name') as string,
    description: formData.get('description') as string,
    is_complete: formData.get('is_complete'),
    id: formData.get('id') as string,
  };

  try {
    await fetchTaskUpdateById(
      {
        name: payload.name,
        description: payload.description,
        is_complete: payload.is_complete === "1",
      },
      payload.id as string,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    revalidatePath('/dashboard');
    return { message: 'Edit Todo successfully!', status: true };
  } catch (e: any) {
    return { message: `${e?.response?.data?.errors}`, status: false };
  }
}
