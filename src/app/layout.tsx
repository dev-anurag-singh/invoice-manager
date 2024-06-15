import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import Provider from '@/components/Provider';

const font = League_Spartan({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Invoice Manager',
  description: 'Manage all your invoices from a single place',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={cn(font.className)}>
        <Provider>
          <div className='flex flex-col h-[100dvh] lg:flex-row'>
            <Navbar />
            <main id='main' className='basis-full overflow-hidden'>
              {children}
            </main>
          </div>
        </Provider>
      </body>
    </html>
  );
}
