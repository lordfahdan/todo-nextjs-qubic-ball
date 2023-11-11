import { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter, usePathname } from 'next/navigation';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const jwt = Cookies.get('jxx');

    if (jwt) {
      if (pathname.includes('/auth')) {
        router.replace('/dashboard');
        return;
      }

    }

    if (!jwt && !pathname.includes('/auth')) {
      router.replace('/auth/signin');
      return;
    }

    setLoaded(true)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <div className="m-10 rounded-lg overflow-hidden shadow-2xl shadow-gray-950">
      {loaded && children}
    </div>
  );
}
