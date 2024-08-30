import { Metadata } from "next";
import Link from "next/link";
import OneCard from "@/feature/oneCard";

export async function generateMetadata({
  params: { uuid },
}: {
  params: { uuid: string };
}): Promise<Metadata> {
  const URL = process.env.NEXT_PUBLIC_AWS_ENDPOINT || "";
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "";

  try {
    const situationsRes = await fetch(`${API_URL}/api/v1/situations/${uuid}`);
    console.log(situationsRes);
    const situationJson = await situationsRes.json();
    const res = await fetch(`${URL}?title=${situationJson.title}`);
    const base64Image = await res.json();

    const title = "会話デッキ！";
    const description =
      "こんなシチュエーションありませんか？会話デッキで会話に挑め！";

    return {
      title: title,
      description: description,
      openGraph: {
        title: title,
        description: description,
        url: `${process.env.NEXT_PUBLIC_APP_URL}/talkDeck/${uuid}`,
        images: [{ url: `data:image/png;base64,${base64Image.body}` }],
      },
      twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [{ url: `data:image/png;base64,${base64Image.body}` }],
      },
    };
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return {
      title: "エラー",
      description: "メタデータの取得中にエラーが発生しました。",
    };
  }
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
