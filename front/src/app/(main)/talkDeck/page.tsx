"use client";

import { Container } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import { useRecoilValue } from "recoil";
import CardCarousel from "@/feature/card";
import PaginationComponent from "@/feature/pagination";
import useFetch from "@/hook/useFetch";
import { userState } from "@/recoil";
import { ICards } from "@/types";

function TalkDeckShow() {
  const params = useSearchParams();
  const router = useRouter();
  const user = useRecoilValue(userState);
  const url = params.get("page")
    ? `/situations?page=${params.get("page")}`
    : "/situations";
  const { loading, error, data } = useFetch(url);
  const { data: all_count } = useFetch("/situations/all_count");

  useEffect(() => {
    if (!all_count) return;
    const page = params.get("page");
    if (!page) return;

    let totalPages = 1;
    totalPages = Math.ceil(all_count.count / 9);
    if (Number(page) >= totalPages) {
      router.push(`/talkDeck?page=${totalPages}`);
    }
  }, [all_count, params, router]);

  if (loading) return <div>loading...</div>;
  if (error) return <div>error...</div>;

  return (
    <article className="w-full md:mb-32">
      <Container>
        <h2 className="text-center text-3xl text-white">みんなのデッキ</h2>
        <div className="md:grid md:grid-cols-3">
          {data.length > 0 ? (
            data.map((data: ICards) => (
              <CardCarousel
                key={data.uuid}
                cards={data}
                isShared
                isLike={user.uuid !== "" && user.uuid !== data.user.uuid}
              />
            ))
          ) : (
            <div>デッキがありません</div>
          )}
        </div>
      </Container>
      {all_count && (
        <PaginationComponent
          total={Math.ceil(all_count ? all_count.count / 9 : 1)}
        />
      )}
    </article>
  );
}

export default function TalkDeck() {
  return (
    <Suspense>
      <TalkDeckShow />
    </Suspense>
  );
}
