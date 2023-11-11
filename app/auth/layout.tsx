"use client"

import Layout from '@/components/Layout';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main>
      <Layout>{children}</Layout>
    </main>
  );
}
