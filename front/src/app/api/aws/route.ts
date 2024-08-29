import { NextResponse } from "next/server";

export async function GET() {
  const API_URL = process.env.API_URL || "";
  const res = await fetch(`${API_URL}?id=1000`);

  if (!res.ok) {
    return NextResponse.error();
  }

  const data = await res.text();
  return new Response(data, {
    headers: { "content-type": "application/json" },
  });
}
