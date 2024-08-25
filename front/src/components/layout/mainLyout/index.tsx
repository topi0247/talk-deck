import * as Layout from "@/components/layout";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full">
      <Layout.Header />
      <main className="flex-grow w-full container p-4 md:p-0">{children}</main>
      <div className="md:pb-32 w-full">
        <Layout.Footer />
      </div>
    </div>
  );
}
