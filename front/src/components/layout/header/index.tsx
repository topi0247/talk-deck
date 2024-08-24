"use client";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import { Burger, Drawer } from "@mantine/core";
import { SiteName } from "@/components/layout";

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  return (
    <>
      <header className="relative w-full pl-2 pt-2">
        <SiteName />
        <nav className="hidden md:block md:fixed bottom-0 left-0 w-full z-50 px-8 bg-black bg-opacity-15">
          <ul className="flex w-full gap-8 max-w-[1000px] m-auto">
            <li className="w-1/4 h-28">
              <Link
                href="/talkDeck"
                className="bg-red-300 px-2 pt-2 flex justify-center items-center rounded w-full transform translate-y-12 hover:-translate-y-0 transition-all h-full"
              >
                <span className="bg-white h-full text-black w-full px-4 py-4 rounded text-center leading-10">
                  一覧
                  <br />
                  みんなのデッキ
                </span>
              </Link>
            </li>
            <li className="w-1/4 h-28">
              <Link
                href="/talkDeck/new"
                className="bg-blue-300 px-2 pt-2 flex justify-center items-center rounded w-full transform translate-y-12 hover:-translate-y-0 transition-all h-full"
              >
                <span className="bg-white h-full text-black w-full px-4 py-4 rounded text-center leading-10">
                  新規作成
                  <br />
                  新しいデッキを作成
                </span>
              </Link>
            </li>
            <li className="w-1/4 h-28">
              <Link
                href="/talkDeck/mydeck"
                className="bg-blue-300 px-2 pt-2 flex justify-center items-center rounded w-full transform translate-y-12 hover:-translate-y-0 transition-all h-full"
              >
                <span className="bg-white h-full text-black w-full px-4 py-4 rounded text-center leading-10">
                  マイデッキ
                  <br />
                  自分のデッキ一覧
                </span>
              </Link>
            </li>
            <li className="w-1/4 h-28">
              <Link
                href="/talkDeck/likes"
                className="bg-green-300 px-2 pt-2 flex justify-center items-center rounded w-full transform translate-y-12 hover:-translate-y-0 transition-all h-full"
              >
                <span className="bg-white h-full text-black w-full px-4 py-4 rounded text-center leading-10">
                  お気に入り
                  <br />
                  お気に入りデッキ一覧
                </span>
              </Link>
            </li>
            <li className="w-1/4 h-28">
              <Link
                href="/mypage"
                className="bg-yellow-300 px-2 pt-2 flex justify-center items-center rounded w-full transform translate-y-12 hover:-translate-y-0 transition-all h-full"
              >
                <span className="bg-white h-full text-black w-full px-4 py-4 rounded text-center leading-10">
                  マイページ
                  <br />
                  ユーザー設定
                </span>
              </Link>
            </li>
          </ul>
        </nav>
        <div className="absolute right-0 top-0 m-4 bg-white rounded-full w-12 h-12 flex justify-center items-center z-50 md:hidden">
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
          <SiteName isMenu />
          <nav className="h-full w-full">
            <ul className="flex flex-col justify-center items-center h-full w-full">
              <li className="w-full text-center">
                <Link
                  href="/talkDeck"
                  className="bg-yellow-100 w-full p-4 flex justify-center items-center"
                  style={{ lineHeight: "1.5" }}
                >
                  一覧
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/talkDeck/new"
                  className="bg-yellow-100 w-full p-4 flex justify-center items-center"
                  style={{ lineHeight: "1.5" }}
                >
                  新規作成
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/talkDeck/mydeck"
                  className="bg-yellow-100 w-full p-4 flex justify-center items-center"
                  style={{ lineHeight: "1.5" }}
                >
                  マイデッキ
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/talkDeck/likes"
                  className="bg-yellow-100 w-full p-4 flex justify-center items-center"
                  style={{ lineHeight: "1.5" }}
                >
                  お気に入り
                </Link>
              </li>
              <li className="w-full text-center">
                <Link
                  href="/mypage"
                  className="bg-yellow-100 w-full p-4 flex justify-center items-center"
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
