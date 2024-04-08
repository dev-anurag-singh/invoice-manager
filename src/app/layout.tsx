import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';

const font = League_Spartan({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Manager',
  description: 'Manage your invoices all from a single place',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={font.className}>
        <div className='flex flex-col h-full lg:flex-row'>
          <Navbar />
          <main className='basis-full'>{children}</main>
        </div>
      </body>
    </html>
  );
}
