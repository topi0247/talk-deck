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
  const base64Image = await res.text();

  const title = "会話デッキ！";
  const description =
    "こんなシチュエーションありませんか？会話デッキで会話に挑め！";

  return {
    metadataBase: process.env.NEXT_PUBLIC_APP_URL || "",
    title: title,
    description: description,
    openGraph: {
      title: title,
      description: description,
      images: [{ url: `data:image/png;base64,${base64Image}` }],
    },
    twitter: {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [{ url: `data:image/png;base64,${base64Image}` }],
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
