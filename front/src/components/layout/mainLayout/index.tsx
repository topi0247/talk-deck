import React from "react";
import * as Layout from "@/components/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <Layout.Header />
      <main className="container w-full grow p-4 md:p-0">{children}</main>
      <div className="w-full md:pb-32">
        <Layout.Footer />
      </div>
    </div>
  );
}
