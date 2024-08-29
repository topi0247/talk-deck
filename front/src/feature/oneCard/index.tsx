"use client";

import CardCarousel from "@/feature/card";
import useFetch from "@/hook/useFetch";
import { userState } from "@/recoil";
import { useRecoilValue } from "recoil";

export default function OneCard({
  params: { uuid },
}: {
  params: { uuid: string };
}) {
  const user = useRecoilValue(userState);
  const { loading, error, data } = useFetch(`/situations/${uuid}`);
  if (loading) return <div>loading...</div>;

  if (error) return <div>error...</div>;

  return (
    <>
      <CardCarousel
        key={uuid}
        cards={data}
        isShared
        isLike={user.uuid !== "" && user.uuid !== data.user.uuid}
      />
    </>
  );
}
