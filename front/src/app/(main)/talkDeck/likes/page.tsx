"use client";

import CardCarousel from "@/feature/card";
import PaginationComponent from "@/feature/pagination";
import useFetch from "@/hook/useFetch";
import { ICards } from "@/types";
import { Container } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

function LikesShow() {
  const params = useSearchParams();
  const router = useRouter();
  const url = params.get("page")
    ? `/likes?page=${params.get("page")}`
    : "/likes";
  const { loading, error, data } = useFetch(url);
  const { data: all_count } = useFetch("/likes_all_count");
  let totalPages = 1;
  if (all_count) {
    totalPages = Math.ceil(all_count.count / 9);
  }

  useEffect(() => {
    if (!all_count) return;
    const page = params.get("page");
    if (!page) return;

    if (Number(page) >= totalPages) {
      router.push(`/talkDeck/likes?page=${totalPages}`);
    }
  }, [all_count, params, router, totalPages]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;
  if (data.length === 0) return <div>デッキがありません</div>;

  return (
    <article className="w-full md:mb-32">
      <Container>
        <h2 className="text-3xl text-center text-white">お気に入りデッキ</h2>
        <div className="md:grid md:grid-cols-3">
          {data.map((data: ICards) => (
            <CardCarousel key={data.uuid} cards={data} isShared isLike />
          ))}
        </div>
      </Container>
      {all_count && <PaginationComponent total={totalPages} />}
    </article>
  );
}

export default function Likes() {
  return (
    <Suspense>
      <LikesShow />
    </Suspense>
  );
}
