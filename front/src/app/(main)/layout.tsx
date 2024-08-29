import React from "react";
import { MainLayout } from "@/components/layout";
import Provider from "@/provider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider>
      <MainLayout>{children}</MainLayout>
    </Provider>
  );
}
