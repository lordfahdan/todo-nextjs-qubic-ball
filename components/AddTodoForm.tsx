'use client';

import { editTodo } from '@/app/dashboard/edit/[id]/actions';
import { addTodo } from '@/app/dashboard/new/actions';
import { TaskType } from '@/interfaces/task';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';

const initialState: {
  message: string;
  status?: boolean;
} = {
  message: '',
  status: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="uppercase block w-full p-2 text-lg rounded bg-indigo-500 hover:bg-indigo-600 focus:outline-none text-white"
    >
      Submit
    </button>
  );
}

export default function AddTodoForm({ id, data }: { id?: string | undefined; data?: TaskType | undefined }) {
  const isEdit = id? editTodo : addTodo
  const [state, formAction] = useFormState(isEdit, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state?.status === true) {
        toast.success(state.message, {
          theme: 'dark',
          autoClose: 1500,
        });

        setTimeout(() => {
          router.push('/dashboard');
        }, 1500);

        return;
      }

      toast.error(state.message, {
        theme: 'dark',
        autoClose: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <form action={formAction}>
        {id && <input type="text" name="id" defaultValue={id} hidden />}
        {data && <input type="text" name="is_complete" defaultValue={`${data.is_complete? 1 : 0}`}  hidden />}
        <div className="pb-4">
          <label htmlFor="name">Name</label>
          <input
            className="block w-full py-3 px-6 text-sm rounded bg-gray-900"
            type="text"
            name="name"
            id="name"
            defaultValue={data?.name}
          />
        </div>
        <div className="pb-4">
          <label htmlFor="description">Description</label>
          <textarea
            className="block w-full py-3 px-6 text-sm rounded bg-gray-900"
            rows={8}
            name="description"
            id="description"
            defaultValue={data?.description}
          />
        </div>
        <SubmitButton />
      </form>
    </>
  );
}
