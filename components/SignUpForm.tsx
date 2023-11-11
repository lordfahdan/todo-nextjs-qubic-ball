'use client';

import { useFormStatus, useFormState } from 'react-dom';
import { signUp } from '@/app/auth/signup/actions';
import Link from 'next/link';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

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
      className="uppercase block w-full p-2 text-lg rounded bg-indigo-500 hover:bg-indigo-600 focus:outline-none text-white"
      aria-disabled={pending}
      disabled={pending}
    >
      sign up
    </button>
  );
}

export function SignUpForm() {
  const [state, formAction] = useFormState(signUp, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state?.status === true) {
        toast.success(state.message, {
          theme: 'dark',
          autoClose: 2000,
        });
        setTimeout(() => {
          router.push('/auth/signin');
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
    <form className="w-full px-4 lg:px-12 text-left" action={formAction}>
      <div className="pb-4">
        <label
          className="block w-full pb-1 text-base font-bold"
          htmlFor="username"
        >
          Username
        </label>
        <input
          className="block w-full py-3 px-6 text-sm rounded bg-gray-800"
          type="text"
          id="username"
          name="username"
          required
        />
        <span className="text-red-500 text-sm italic">
          {state.errors?.username}
        </span>
      </div>
      <div className="pb-4">
        <label className="block w-full pb-1 text-base font-bold" htmlFor="name">
          Name
        </label>
        <input
          className="block w-full py-3 px-6 text-sm rounded bg-gray-800"
          type="text"
          id="name"
          name="name"
          required
        />
        <span className="text-red-500 text-sm italic">
          {state.errors?.name}
        </span>
      </div>
      <div className="pb-4">
        <label
          className="block w-full pb-1 text-base font-bold"
          htmlFor="email"
        >
          Email
        </label>
        <input
          className="block w-full py-3 px-6 text-sm rounded bg-gray-800"
          type="email"
          id="email"
          name="email"
          required
        />
        <span className="text-red-500 text-sm italic">
          {state.errors?.email}
        </span>
      </div>
      <div className="pb-4">
        <label
          className="block w-full pb-1 text-base font-bold"
          htmlFor="password"
        >
          Password
        </label>
        <input
          className="block w-full py-3 px-6 text-sm rounded bg-gray-800"
          type="password"
          name="password"
          id="password"
          required
        />
        <span className="text-red-500 text-sm italic">
          {state.errors?.password}
        </span>
      </div>
      <div className="pb-4">
        <label
          className="block w-full pb-1 text-base font-bold"
          htmlFor="confirm_password"
        >
          Confirm Password
        </label>
        <input
          className="block w-full py-3 px-6 text-sm rounded bg-gray-800"
          type="password"
          name="confirm_password"
          id="confirm_password"
        />
        <span className="text-red-500 text-sm italic">
          {state.errors?.confirm_password}
        </span>
      </div>
      <div className="pb-2 pt-12">
        <SubmitButton />
      </div>
      <div className="text-right text-gray-400 hover:text-gray-100">
        <span>
          Already have an account?
          <Link className="pl-2 text-blue-600" href={'/auth/signin'}>
            Sign In
          </Link>
        </span>
      </div>
      <p aria-live="polite" className="sr-only" role="status">
        {state?.message}
      </p>
    </form>
  );
}
