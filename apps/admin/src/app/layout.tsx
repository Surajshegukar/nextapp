import { Outfit } from 'next/font/google';
import './globals.css';

import { SidebarProvider } from '@/context/SidebarContext';
import { ThemeProvider } from '@/context/ThemeContext';
import ToastProvider from '@/components/ToasterProvider';
import { Toaster } from 'react-hot-toast';
import ToasterProvider from '@/components/ToasterProvider';

const outfit = Outfit({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.className} dark:bg-gray-900`}>

        <ThemeProvider>
          <ToasterProvider />
          <SidebarProvider>{children}</SidebarProvider>
        </ThemeProvider>

      </body>
    </html>
  );
}
