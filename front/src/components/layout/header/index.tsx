"use client";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Drawer } from "@mantine/core";

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <header className="relative w-full p-5 flex justify-center items-center">
        <h1 className="text-2xl py-3">会話デッキ！</h1>
        <nav className="hidden">
          <ul className="flex">
            <li>
              <Link href="/talkDeck">一覧</Link>
            </li>
            <li>
              <Link href="/talkDeck">お気に入り</Link>
            </li>
            <li>
              <Link href="/talkDeck">マイデッキ</Link>
            </li>
            <li>
              <Link href="/talkDeck">ユーザーページ</Link>
            </li>
          </ul>
        </nav>
        <div className="absolute right-0 top-0 m-4 bg-white rounded-full w-12 h-12 flex justify-center items-center">
          <Burger opened={opened} onClick={toggle} aria-label="Menu" />
        </div>
      </header>
      <Drawer
        opened={opened}
        onClose={toggle}
        padding="md"
        size="xs"
        position="right"
      >
        <div className="h-full w-full flex justify-center items-center flex-col">
          <h3 className="text-3xl text-center">会話デッキ！</h3>
          <nav className="h-full w-full">
            <ul className="flex flex-col justify-center items-center h-full w-full">
              <li className="w-full text-center">
                <Link
                  href="/talkDeck"
                  className="bg-blue-100 w-full p-4 flex justify-center items-center"
                  style={{ lineHeight: "1.5" }}
                >
                  一覧
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/talkDeck"
                  className="bg-blue-100 w-full p-4 flex justify-center items-center"
                  style={{ lineHeight: "1.5" }}
                >
                  お気に入り
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/talkDeck"
                  className="bg-blue-100 w-full p-4 flex justify-center items-center"
                  style={{ lineHeight: "1.5" }}
                >
                  マイデッキ
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/talkDeck"
                  className="bg-blue-100 w-full p-4 flex justify-center items-center"
                  style={{ lineHeight: "1.5" }}
                >
                  ユーザーページ
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Drawer>
    </>
  );
}
