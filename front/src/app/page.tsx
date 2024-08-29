import { Container } from "@mantine/core";
import Link from "next/link";
import { Suspense } from "react";
import { Footer, SiteName } from "@/components/layout";
import { Login } from "@/feature/auth";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center text-black">
      <div className="w-full grow">
        <main className="w-full p-4">
          <Link href="/">
            <SiteName />
          </Link>
          <Container className="my-8">
            <div className="flex flex-col items-center justify-center rounded bg-white">
              <h2 className="w-full rounded-t bg-yellow-300 py-1 text-center text-xl font-semibold tracking-[5px]">
                会話デッキとは？
              </h2>
              <div className="my-4 rounded border-2 border-yellow-300 p-4">
                <p>どんなシチュエーションでも！</p>
                <p>初対面でも既知の間柄でも！</p>
                <p>会話デッキを駆使して</p>
                <p>盛り上がっていこう！</p>
              </div>
            </div>

            <div className="mt-8 flex flex-col items-center justify-center gap-4 rounded bg-white p-8">
              <Link
                href="/talkDeck"
                className="rounded border border-yellow-400 px-3 py-2"
              >
                みんなのデッキを見る
              </Link>
              <Suspense>
                <Login />
              </Suspense>
            </div>
          </Container>
        </main>
      </div>
      <Footer />
    </div>
  );
}
