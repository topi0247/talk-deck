import CardCarousel from "@/feature/card";
import { ICards } from "@/types";
import Link from "next/link";

const Data: ICards = {
  uuid: "0",
  situation: "situation",
  target: ["target", "target", "target"],
  creator: "creator",
  cards: Array.from({ length: 10 }, (_, j) => ({
    index: j,
    title: `title-${j}`,
    content: `content-${j}`,
  })),
};

export default function Card({ uuid }: { uuid: string }) {
  console.log(uuid);
  return (
    <>
      <CardCarousel key={uuid} cards={Data} isShared />
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
