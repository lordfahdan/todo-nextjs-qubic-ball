'use client';

import Layout from '@/components/Layout';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';
import { UserType } from '@/interfaces/user';
import { fetchUser } from '@/utils/api';
import { useEffect, useState } from 'react';
import { toast } from "react-toastify";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    fetchUser().then((result) => {
      setUser(result.data)
    }).catch((err) => {
      toast.error(`${err?.response?.data?.errors}`)
    });
  }, [])

  return (
    <Layout>
      <div className="flex items-start bg-gray-800">
        <Sidebar />
        <div className="flex flex-col w-full">
          <Navbar user={user} />
          <div className="p-8">
            {children}
          </div>
        </div>
      </div>
    </Layout>
  );
}
