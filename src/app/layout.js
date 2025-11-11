"use client";

import { Anek_Latin, Inria_Sans } from 'next/font/google';
import "./globals.css";
import Topo from "./components/Topo";
import Footer from './components/Footer';
import { usePathname } from 'next/navigation';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

  const noLayoutPages = ['/cadastro', '/login', '/perfil'];
  const showLayout = !noLayoutPages.includes(pathname);

  return (
    <html lang="pt-br" className={anek.className}>
      <head>
        <title>Villa Indaiá</title>
        <meta
          name="description"
          content="Encontre o imóvel dos seus sonhos com a Villa Imobiliária."
        />
        <link rel="icon" href="/villa-logo-img.png" type="image/png" />
      </head>
      <body className={inria.className}>
        {showLayout && <Topo />}
        {children}
        {showLayout && <Footer />}

        {/* ✅ Adicione aqui o ToastContainer */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          closeButton={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </body>
    </html>
  );
}
