'use client';

import { signIn } from '@/app/auth/signin/actions';
import Link from 'next/link';
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
      className="uppercase block w-full p-2 text-lg rounded bg-indigo-500 hover:bg-indigo-600 focus:outline-none text-white"
      aria-disabled={pending}
      disabled={pending}
    >
      sign in
    </button>
  );
}

export default function SignInForm() {
  const [state, formAction] = useFormState(signIn, initialState);
  const router = useRouter();

  useEffect(() => {
    if (state.message) {
      if (state?.status === true) {
        toast.success(state.message, {
          theme: 'dark',
          autoClose: 1500
        });

        setTimeout(() => {
          router.push('/')
        }, 1500)

        return;
      }

      toast.error(state.message, {
        theme: 'dark',
        autoClose: 2000
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <>
      <form className="w-full px-12 text-left" action={formAction}>
        <div className="pb-4">
          <label
            className="block w-full pb-1 text-base font-bold"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="block w-full py-3 px-6 text-sm rounded bg-gray-900"
            type="text"
            id="username"
            name="username"
            required
          />
        </div>
        <div className="pb-4">
          <label
            className="block w-full pb-1 text-base font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="block w-full py-3 px-6 text-sm rounded bg-gray-900"
            type="password"
            name="password"
            id="password"
            required
          />
        </div>
        <div className="pb-2 pt-16">
          <SubmitButton />
        </div>
        <div className="text-right text-gray-400 hover:text-gray-100">
          <span>
            Don&apos;t have an account?<Link className="pl-2 text-blue-600" href={'/auth/signup'}>Sign Up</Link>
          </span>
        </div>
        <p aria-live="polite" className="sr-only" role="status">
          {state?.message}
        </p>
      </form>
    </>
  );
}
