import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>会話デッキ！</h1>
      <Link href="/talkDeck">デッキを見に行く</Link>
    </main>
  );
}
