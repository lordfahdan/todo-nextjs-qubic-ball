import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/global.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import { ToastContainer } from 'react-toastify';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '300', '400', '500', '700', '900'],
});

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="en">
      <body className={roboto.className}>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
