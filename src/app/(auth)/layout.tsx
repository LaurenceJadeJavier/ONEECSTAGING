"use client";
import NextTopLoader from "nextjs-toploader";
export default function AuthRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NextTopLoader easing="ease" showSpinner={false} color="#272829" />
      <section>{children}</section>
    </>
  );
}
