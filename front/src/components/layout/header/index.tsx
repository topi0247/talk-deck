"use client";
import { Burger, Drawer } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { useRecoilValue } from "recoil";
import { SiteName } from "@/components/layout";
import { CurrentUser } from "@/feature/auth";
import { userState } from "@/recoil";

export default function Header() {
  const [opened, { toggle }] = useDisclosure();
  const user = useRecoilValue(userState);

  return (
    <>
      <CurrentUser />
      <header className="relative w-full pl-2 pt-2">
        <Link
          href={user.name ? "/talkDeck" : "/"}
          className="inline-block w-80"
        >
          <SiteName />
        </Link>
        <nav className="bottom-0 left-0 z-50 hidden w-full bg-black/15 px-8 md:fixed md:block">
          <ul className="m-auto flex w-full max-w-[1000px] items-center justify-center gap-8">
            <li className="h-28 w-1/4">
              <Link
                href="/talkDeck"
                className="flex size-full translate-y-12 items-center justify-center rounded bg-red-300 px-2 pt-2 transition-all hover:-translate-y-0"
              >
                <span className="size-full rounded bg-white p-4 text-center leading-10 text-black">
                  一覧
                  <br />
                  みんなのデッキ
                </span>
              </Link>
            </li>
            {user.name && (
              <>
                <li className="h-28 w-1/4">
                  <Link
                    href="/talkDeck/new"
                    className="flex size-full translate-y-12 items-center justify-center rounded bg-blue-300 px-2 pt-2 transition-all hover:-translate-y-0"
                  >
                    <span className="size-full rounded bg-white p-4 text-center leading-10 text-black">
                      新規作成
                      <br />
                      新しいデッキ
                    </span>
                  </Link>
                </li>
                <li className="h-28 w-1/4">
                  <Link
                    href="/talkDeck/mydeck"
                    className="flex size-full translate-y-12 items-center justify-center rounded bg-blue-300 px-2 pt-2 transition-all hover:-translate-y-0"
                  >
                    <span className="size-full rounded bg-white p-4 text-center leading-10 text-black">
                      マイデッキ
                      <br />
                      自分のデッキ
                    </span>
                  </Link>
                </li>
                <li className="h-28 w-1/4">
                  <Link
                    href="/talkDeck/likes"
                    className="flex size-full translate-y-12 items-center justify-center rounded bg-green-300 px-2 pt-2 transition-all hover:-translate-y-0"
                  >
                    <span className="size-full rounded bg-white p-4 text-center leading-10 text-black">
                      お気に入り
                      <br />
                      お気に入り
                    </span>
                  </Link>
                </li>
                <li className="h-28 w-1/4">
                  <Link
                    href="/mypage"
                    className="flex size-full translate-y-12 items-center justify-center rounded bg-yellow-300 px-2 pt-2 transition-all hover:-translate-y-0"
                  >
                    <span className="size-full rounded bg-white p-4 text-center leading-10 text-black">
                      マイページ
                      <br />
                      ユーザー設定
                    </span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
        <div className="absolute right-0 top-0 z-50 m-4 flex size-12 items-center justify-center rounded-full bg-white md:hidden">
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
        <div className="flex size-full flex-col items-center justify-center">
          <SiteName isMenu />
          <nav className="size-full">
            <ul className="flex size-full flex-col items-center justify-center">
              <li className="w-full text-center">
                <Link
                  href="/"
                  className="flex w-full items-center justify-center bg-yellow-100 p-4"
                  style={{ lineHeight: "1.5" }}
                >
                  TOP
                </Link>
                <Link
                  href="/talkDeck"
                  className="flex w-full items-center justify-center bg-yellow-100 p-4"
                  style={{ lineHeight: "1.5" }}
                >
                  一覧
                </Link>
              </li>
              {user.name && (
                <>
                  <li className="w-full text-center">
                    <Link
                      href="/talkDeck/new"
                      className="flex w-full items-center justify-center bg-yellow-100 p-4"
                      style={{ lineHeight: "1.5" }}
                    >
                      新規作成
                    </Link>
                  </li>
                  <li className="w-full text-center">
                    <Link
                      href="/talkDeck/mydeck"
                      className="flex w-full items-center justify-center bg-yellow-100 p-4"
                      style={{ lineHeight: "1.5" }}
                    >
                      マイデッキ
                    </Link>
                  </li>
                  <li className="w-full text-center">
                    <Link
                      href="/talkDeck/likes"
                      className="flex w-full items-center justify-center bg-yellow-100 p-4"
                      style={{ lineHeight: "1.5" }}
                    >
                      お気に入り
                    </Link>
                  </li>
                  <li className="w-full text-center">
                    <Link
                      href="/mypage"
                      className="flex w-full items-center justify-center bg-yellow-100 p-4"
                      style={{ lineHeight: "1.5" }}
                    >
                      ユーザーページ
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </nav>
        </div>
      </Drawer>
    </>
  );
}
