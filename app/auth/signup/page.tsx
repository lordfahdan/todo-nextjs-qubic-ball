import { SignUpForm } from '@/components/SignUpForm';
import Image from 'next/image';
import { FcPlanner } from 'react-icons/fc';

export default function SignUp() {
  return (
    <>
      <section className="flex min-h-[90vh] text-white ">
        <div className="lg:flex w-1/2 hidden bg-no-repeat bg-cover relative items-center">
          <Image
            className="absolute inset-0"
            src="/wallpaper.jpg"
            alt="auth wallpaper"
            fill={true}
          />
          <div className="absolute bg-gray-950 opacity-80 inset-0 z-0"></div>
          <div className="w-full px-24 z-10 flex items-center">
            <FcPlanner className="shrink-0 text-9xl mr-2" />
            <div>
              <h1 className="text-7xl font-bold text-left tracking-wide">
                Todo App
              </h1>
              <p className="text-lg text-gray-400 mt-4">
                The best choice to be productive! 📚
              </p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-gray-950">
          <div className="w-full py-10 z-20">
            <h1 className="text-2xl lg:text-5xl mb-8 font-bold">Sign Up</h1>
            <SignUpForm />
          </div>
        </div>
      </section>
    </>
  );
}
