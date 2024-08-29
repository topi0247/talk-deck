import React from "react";
export default function FormCard({ children }: { children: React.ReactNode }) {
  return <section className="rounded bg-gray-300 p-4">{children}</section>;
}
