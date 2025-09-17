"use client";

import { Anek_Latin, Inria_Sans } from 'next/font/google';
import "./globals.css";
import Topo from "./components/Topo";
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';

const anek = Anek_Latin({
  subsets: ['latin'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const inria = Inria_Sans({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '700'],
});



export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Páginas que NÃO vão ter topo e footer
  const noLayoutPages = ['/cadastro', '/login'];

  const showLayout = !noLayoutPages.includes(pathname);

  return (
    <html lang="pt-br" className={anek.className}>
      <body className={inria.className}>
        {showLayout && <Topo />}
        {children}
        {showLayout && <Footer />}
      </body>
    </html>
  );
}
