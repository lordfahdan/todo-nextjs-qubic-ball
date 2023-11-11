'use client';

import { updateProfile } from '@/app/dashboard/profile/actions';
import { UpdateProfileFormType, UserType } from '@/interfaces/user';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { toast } from 'react-toastify';

const initialState: {
  message: string;
  errors: any;
  status: any;
} = {
  message: '',
  errors: undefined,
  status: undefined,
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      aria-disabled={pending}
      className="py-2 px-4 text-base font-bold rounded bg-indigo-500 hover:bg-indigo-600 focus:outline-none text-white"
    >
      Submit
    </button>
  );
}

export default function ProfileForm({user}: {user: UserType | undefined}) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(updateProfile, initialState);
  const [form, setForm] = useState<UpdateProfileFormType>({
    name: '',
    old_password: '',
    new_password: ''
  })

  useEffect(() => {
    setForm((prevValue) => ({
      ...prevValue,
      name: user?.name ?? '',
    }))
  }, [user])

  useEffect(() => {
    if (state.message) {
      if (state?.status === true) {
        toast.success(state.message, {
          theme: 'dark',
          autoClose: 1300,
        });

        setTimeout(() => {
          window.location.reload();
          // formRef?.current?.reset();
        }, 2000)

        return;
      }

      toast.error(state.errors, {
        theme: 'dark',
        autoClose: 2000,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <form
        className="grid gap-4 gap-y-2 text-sm grid-cols-1 md:grid-cols-5"
        // ref={formRef}
        action={formAction}
      >
        <div className="md:col-span-5 mb-2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            className="rounded py-3 px-6 w-full bg-gray-900 opacity-60 text-sm text-gray-400"
            defaultValue={user?.username}
            aria-disabled
            disabled
          />
        </div>
        <div className="md:col-span-5 mb-2">
          <label htmlFor="email">Email Address</label>
          <input
            className="rounded py-3 px-6 w-full bg-gray-900 opacity-60 text-sm text-gray-400"
            defaultValue={user?.email}
            type="email"
            id="email"
            name="email"
            aria-disabled
            disabled
          />
          <span className='text-sm italic text-red-600'>{state.errors?.email}</span>
        </div>

        <div className="md:col-span-5 mb-2">
          <label htmlFor="name">Name</label>
          <input
            className="rounded py-3 px-6 w-full bg-gray-900 text-sm text-white"
            defaultValue={form.name}
            type="text"
            name="name"
            id="name"
            required
          />
          <span className='text-sm italic text-red-600'>{state.errors?.name}</span>
        </div>


        <div className="md:col-span-5 mb-2">
          <label htmlFor="old_password">Old Password</label>
          <input
            className="rounded py-3 px-6 w-full bg-gray-900 text-sm text-white"
            type="password"
            id="old_password"
            name="old_password"
            required
          />
          <span className='text-sm italic text-red-600'>{state.errors?.old_password}</span>
        </div>

        <div className="md:col-span-5 mb-2">
          <label htmlFor="new_password">New Password</label>
          <input
            className="rounded py-3 px-6 w-full bg-gray-900 text-sm text-white"
            type="password"
            id="new_password"
            name="new_password"
            required
          />
          <span className='text-sm italic text-red-600'>{state.errors?.new_password}</span>
        </div>

        <div className="md:col-span-5 mb-2 text-right">
          <div className="inline-flex items-end">
            <SubmitButton />
          </div>
        </div>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </>
  );
}
