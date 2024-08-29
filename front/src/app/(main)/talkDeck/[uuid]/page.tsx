import Link from "next/link";
import OneCard from "@/feature/oneCard";

export async function generateMetadata({
  params: { uuid },
}: {
  params: { uuid: string };
}) {
  const URL = process.env.NEXT_PUBLIC_AWS_ENDPOINT || "";
  const id = uuid;
  const res = await fetch(`${URL}?id=${id}`);
  const base64Image = await res.json();

  return {
    title: `Post ${id}`,
    description: `Description for post ${id}`,
    openGraph: {
      title: `Post ${id}`,
      description: `Description for post ${id}`,
      images: [{ url: `data:image/png;base64,${base64Image.data}` }],
    },
  };
}

export default function Card({
  params: { uuid },
}: {
  params: { uuid: string };
}) {
  return (
    <>
      <OneCard params={{ uuid }} />
      <div className="mt-8 flex items-center justify-center">
        <Link
          href="/talkDeck"
          className="rounded border border-green-400 bg-green-300/50 px-4 py-2 text-white"
        >
          一覧へ戻る
        </Link>
      </div>
    </>
  );
}
