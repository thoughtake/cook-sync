"use client";

import "./globals.css";

import Container from "@/components/common/layout/container";
import { ModalProvider } from "@/context/modal-context";
import Modal from "@/components/common/ui/modal/modal";
import Header from "@/components/common/layout/header";
import Footer from "@/components/common/layout/footer";
import { useEffect, useState } from "react";
import clsx from "clsx";


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/yakuhanjp@4.1.1/dist/css/yakuhanjp.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Kaisei+Decol:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={clsx(
          "antialiased bg-background",
          "font-[var(--font-stack)] color-text",
          "box-content overflow-y-scroll"
        )}
      >
        {isClient && (
          <ModalProvider>
            <Header />
            <Container className={"py-15"}>{children}</Container>
            <Modal />
            <Footer />
          </ModalProvider>
        )}
      </body>
    </html>
  );
}
