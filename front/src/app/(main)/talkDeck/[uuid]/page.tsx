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
  const title = "会話デッキ！";
  const description =
    "こんなシチュエーションありませんか？会話デッキで会話に挑め！";

  try {
    const situationsRes = await fetch(`${API_URL}/api/v1/situations/${uuid}`);
    console.log(situationsRes);
    const situationJson = await situationsRes.json();
    console.log(situationJson);
    if (!situationJson) {
      return {
        title: "会話デッキ",
        description: "会話に困る、そんなときにオススメの会話デッキ！",
        openGraph: {
          title: "会話デッキ",
          description: "会話に困る、そんなときにオススメの会話デッキ！",
          url: process.env.NEXT_PUBLIC_APP_URL,
          siteName: "会話デッキ",
          type: "website",
          images: `${process.env.NEXT_PUBLIC_APP_URL}/ogp.png`,
        },
        twitter: {
          card: "summary_large_image",
          title: "会話デッキ",
          description: "会話に困る、そんなときにオススメの会話デッキ！",
          images: `${process.env.NEXT_PUBLIC_APP_URL}/ogp.png`,
        },
      };
    }
    const res = await fetch(`${URL}?title=${situationJson.title}`);
    console.log(res);
    const base64Image = await res.json();
    console.log(base64Image);

    if (!base64Image.body) {
      return {
        title: "会話デッキ",
        description: "会話に困る、そんなときにオススメの会話デッキ！",
        openGraph: {
          title: "会話デッキ",
          description: "会話に困る、そんなときにオススメの会話デッキ！",
          url: process.env.NEXT_PUBLIC_APP_URL,
          siteName: "会話デッキ",
          type: "website",
          images: `${process.env.NEXT_PUBLIC_APP_URL}/ogp.png`,
        },
        twitter: {
          card: "summary_large_image",
          title: "会話デッキ",
          description: "会話に困る、そんなときにオススメの会話デッキ！",
          images: `${process.env.NEXT_PUBLIC_APP_URL}/ogp.png`,
        },
      };
    }

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
      title: "会話デッキ",
      description: "会話に困る、そんなときにオススメの会話デッキ！",
      openGraph: {
        title: "会話デッキ",
        description: "会話に困る、そんなときにオススメの会話デッキ！",
        url: process.env.NEXT_PUBLIC_APP_URL,
        siteName: "会話デッキ",
        type: "website",
        images: `${process.env.NEXT_PUBLIC_APP_URL}/ogp.png`,
      },
      twitter: {
        card: "summary_large_image",
        title: "会話デッキ",
        description: "会話に困る、そんなときにオススメの会話デッキ！",
        images: `${process.env.NEXT_PUBLIC_APP_URL}/ogp.png`,
      },
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
