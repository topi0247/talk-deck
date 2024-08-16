import { Footer, Header } from "@/components/layout";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-blue-200">
      <Header />
      <main className="flex-grow w-full container p-4 md:p-0">{children}</main>
      <Footer />
    </div>
  );
}
