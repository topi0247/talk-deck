import CardCarousel from "@/feature/card";
import PaginationComponent from "@/feature/pagination";
import { ICards } from "@/types";
import { Container } from "@mantine/core";
import { Suspense } from "react";

const CardData: ICards[] = Array.from({ length: 10 }, (_, i) => ({
  uuid: i.toString(),
  situation: `situation-${i}`,
  target: ["target", "target", "target"],
  creator: "creator",
  cards: Array.from({ length: 10 }, (_, j) => ({
    index: j,
    title: `title-${j}`,
    content: `content-${j}`,
  })),
}));

export default function LikesDeck() {
  return (
    <article className="w-full md:mb-32">
      <Container>
        <h2 className="text-3xl text-center text-white">お気に入りデッキ</h2>
        <div className="md:grid md:grid-cols-3">
          {CardData.map((data) => (
            <CardCarousel key={data.uuid} cards={data} isShared />
          ))}
        </div>
      </Container>
      <Suspense fallback={<></>}>
        <PaginationComponent total={Math.ceil(10 / 10)} />
      </Suspense>
    </article>
  );
}
