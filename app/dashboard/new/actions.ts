'use server';

import { fetchTaskCreate } from '@/utils/api';
import { addTodoSchema } from '@/utils/schema/task';
import { revalidatePath } from 'next/cache';
import { cookies } from 'next/headers';

export async function addTodo(prevState: any, formData: FormData) {
  const token = cookies().get('jxx')
    ? `Bearer ${cookies().get('jxx')?.value}`
    : '';

  const payload = addTodoSchema.parse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  try {
    await fetchTaskCreate(
      {
        name: payload.name,
        description: payload.description,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );

    revalidatePath('/dashboard');
    return { message: 'Add Todo successfully!', status: true };
  } catch (e: any) {
    console.log(e.response)
    return { message: `${e?.response?.data?.errors}`, status: false };
  }
}
