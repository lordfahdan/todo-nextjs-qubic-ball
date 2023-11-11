import { FcPlanner } from 'react-icons/fc';
import { AiOutlineHome } from 'react-icons/ai';
import { LiaUserEditSolid } from 'react-icons/lia';
import { VscSignOut } from 'react-icons/vsc';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

const Menu = ({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) => {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      className={`
        ${pathname === href && 'bg-gray-700'}
        flex items-center w-full h-12 px-3 mt-2 rounded hover:bg-gray-700 hover:text-gray-300
      `}
    >
      {children}
      <span className="ml-2 text-sm font-medium">{label}</span>
    </Link>
  );
};

export default function Sidebar() {
  const router = useRouter()

  const fetchSignOut = () => {
    Cookies.remove('jxx')

    toast.success("Sign out successfully!", {
      theme: 'dark',
      autoClose: 2000,
    })

    setTimeout(() => {
      router.replace('/auth/signin')
    }, 2100)
  }

  return (
    <div className="flex flex-col shrink-0 items-center w-64 h-[90vh] overflow-hidden text-gray-400 bg-gray-900">
      <div className="flex items-center justify-center w-full px-3 py-2 mt-3">
        <FcPlanner className="shrink-0 text-xl lg:text-4xl mr-2" />
        <span className="ml-2 text-lg lg:text-2xl font-bold">Todo App</span>
      </div>
      <div className="w-full px-2">
        <div className="flex flex-col items-center w-full mt-3 py-4 border-t border-gray-700">
          <Menu href="/dashboard" label="Dashboard">
            <AiOutlineHome className="text-xl" />
          </Menu>
          <Menu href="/dashboard/profile" label="Profile">
            <LiaUserEditSolid className="text-xl" />
          </Menu>
        </div>
      </div>
      <div onClick={fetchSignOut} className="flex items-center w-full py-4 px-6 mt-auto cursor-pointer bg-gray-950 hover:bg-gray-700 hover:text-gray-300">
        <VscSignOut className="text-xl" />
        <span className="ml-2 text-sm font-medium">Sign Out</span>
      </div>
    </div>
  );
}
