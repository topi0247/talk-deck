"use client";

import { Pagination } from "@mantine/core";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaginationComponent({ total }: { total: number }) {
  const [activePage, setActivePage] = useState(1);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const page = searchParams.get("page");
    if (page) setActivePage(parseInt(page));
    else setActivePage(1);
  }, [searchParams]);

  const handleOnChange = (pageNumber: number) => {
    if (pageNumber === activePage) return;
    if (pageNumber === 1) return router.push("/talkDeck");
    const url = new URL(window.location.href);
    url.searchParams.set("page", pageNumber.toString());
    const nextUrl = url.toString().replace(window.location.origin, "");
    console.log(nextUrl);
    router.push(nextUrl);
  };

  return (
    <div className="w-full text-white flex justify-center items-center mt-8">
      <Pagination
        value={activePage}
        onChange={handleOnChange}
        total={total}
        color="yellow"
        withEdges
      />
    </div>
  );
}
