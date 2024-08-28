"use client";

import CardCarousel from "@/feature/card";
import useFetch from "@/hook/useFetch";
import { userState } from "@/recoil";
import Link from "next/link";
import { useRecoilValue } from "recoil";

export default function Card({
  params: { uuid },
}: {
  params: { uuid: string };
}) {
  const user = useRecoilValue(userState);
  const { loading, error, data } = useFetch(`/situations/${uuid}`);
  if (loading) return <div>loading...</div>;

  if (error) return <div>error...</div>;
  console.log(data);

  return (
    <>
      <CardCarousel
        key={uuid}
        cards={data}
        isShared
        isLikes={user.uuid !== data.user.uuid}
      />
      <div className="mt-8 flex justify-center items-center">
        <Link
          href="/talkDeck"
          className="bg-green-300 bg-opacity-50 border border-green-400 rounded px-4 py-2 text-white"
        >
          一覧へ戻る
        </Link>
      </div>
    </>
  );
}
