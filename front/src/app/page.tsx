import { Footer, SiteName } from "@/components/layout";
import { Login } from "@/feature/auth";
import { Container } from "@mantine/core";
import Link from "next/link";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center text-black">
      <div className="w-full flex-grow">
        <main className="w-full p-4">
          <Link href="/">
            <SiteName />
          </Link>
          <Container className="my-8">
            <div className="bg-white rounded flex justify-center items-center flex-col">
              <h2 className="w-full text-center bg-yellow-300 rounded-t text-xl py-1 font-semibold tracking-[5px]">
                会話デッキとは？
              </h2>
              <div className="border-2 border-yellow-300 my-4 rounded p-4">
                <p>どんなシチュエーションでも！</p>
                <p>初対面でも既知の間柄でも！</p>
                <p>会話デッキを駆使して</p>
                <p>盛り上がっていこう！</p>
              </div>
            </div>

            <div className="p-8 bg-white rounded flex justify-center items-center flex-col gap-4 mt-8">
              <Link
                href="/talkDeck"
                className="border rounded px-3 py-2 border-yellow-400"
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
