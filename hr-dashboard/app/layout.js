import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Providers from './providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'HR Dashboard',
  description: 'HR Performance Management Dashboard',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body 
        className={`${inter.className} bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white`}
        suppressHydrationWarning
      >
        <Providers>
          <Header />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}