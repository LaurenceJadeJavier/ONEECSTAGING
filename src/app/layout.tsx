import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Roboto } from "next/font/google";
import "./globals.css";
import QueryProvider from "../../providers/provider";
import { AuthProvider } from "../../utils/useAuth";
import NextTopLoader from "nextjs-toploader";
import { SelectedUserProvider } from "../../utils/contextProvider";
import Image from "next/image";
import Head from "next/head";
import { toast, Toaster } from "sonner";
const inter = Roboto({
  subsets: ["cyrillic-ext"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal"],
});

export const metadata: Metadata = {
  title: "ONE EC",
  description: "ONE EC",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SelectedUserProvider>
      <html lang="en">
        <body className={inter.className}>
          <Toaster position="top-center" duration={2000} />
          <QueryProvider>
            <NextTopLoader easing="ease" showSpinner={false} color="#272829" />
            <Head>
              {/* Link to the favicon */}
              <link rel="icon" href="/favicon.ico" />
            </Head>

            {children}
          </QueryProvider>
        </body>
      </html>
    </SelectedUserProvider>
  );
}
