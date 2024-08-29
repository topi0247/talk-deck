"use client";

import { Button } from "@mantine/core";
import { usePathname } from "next/navigation";
import React from "react";
import { EffectCards } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import Likes from "@/feature/likes";
import { ICards } from "@/types";

export default function CardCarousel({
  cards,
  isShared,
  isLike,
}: {
  cards: ICards;
  isShared?: boolean;
  isLike?: boolean;
}) {
  const pathname = usePathname();

  const handleClick = (uuid: string) => {
    const text = `${cards.title}での %20%23会話デッキ%20はこちら！！%0a`;
    const appUrl =
      window.location.href.replace(pathname, "") + `/talkDeck/${uuid}`;
    const url = `https://x.com/intent/tweet?text=${text}&url=${appUrl}`;
    window.open(url, "_blank");
  };

  return (
    <div className="my-4 w-full items-center justify-center overflow-hidden">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="overflow-hidden"
      >
        <SwiperSlide>
          <div className="situation">
            <h3>{cards.title}</h3>
          </div>
          <div className="target">
            <h4>こんな人におすすめ！</h4>
            <ul>
              {cards.targets.map((target, index) => (
                <li key={index}>{target.body}</li>
              ))}
            </ul>
          </div>
          <div className="creator">
            <p>by {cards.user.name}</p>
          </div>
        </SwiperSlide>
        {cards.contents.map((card, index) => (
          <SwiperSlide key={index}>
            <div className="title">
              <h3>{card.title}</h3>
            </div>
            <div className="content">
              <h4>コメント</h4>
              <p>{card.comment}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="mt-2 flex w-full items-center justify-center gap-4">
        {isShared && (
          <Button
            variant="filled"
            color="black"
            onClick={() => handleClick(cards.uuid)}
          >
            X Share
          </Button>
        )}
        {isLike && <Likes uuid={cards.uuid} isLike={cards.isLike} />}
      </div>
    </div>
  );
}
