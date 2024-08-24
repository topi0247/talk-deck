"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/effect-cards";

import { EffectCards } from "swiper/modules";
import { Button } from "@mantine/core";
import { ICards } from "@/types";
import Likes from "@/feature/likes";

export default function CardCarousel({
  cards,
  isShared,
}: {
  cards: ICards;
  isShared: boolean;
}) {
  return (
    <div className="w-full overflow-hidden my-4 justify-center items-center">
      <Swiper
        effect={"cards"}
        grabCursor={true}
        modules={[EffectCards]}
        className="overflow-hidden"
      >
        <SwiperSlide>
          <div className="situation">
            <h3>{cards.situation}</h3>
          </div>
          <div className="target">
            <h4>こんな人におすすめ！</h4>
            <ul>
              {cards.target.map((target) => (
                <li key={target}>{target}</li>
              ))}
            </ul>
          </div>
          <div className="creator">
            <p>by {cards.creator}</p>
          </div>
        </SwiperSlide>
        {cards.cards.map((card) => (
          <SwiperSlide key={card.title}>
            <div className="title">
              <h3>{card.title}</h3>
            </div>
            <div className="content">
              <h4>詳細</h4>
              <p>{card.content}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {isShared && (
        <div className="w-full flex justify-center items-center mt-2 gap-4">
          <Button variant="default">X Share</Button>
          <Likes />
        </div>
      )}
    </div>
  );
}
