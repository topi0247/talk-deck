"use client";
import { Button } from "@mantine/core";
import Cookies from "js-cookie";
import { useState } from "react";
import { mutate } from "swr";
import { Config } from "@/config";

export default function Likes({
  uuid,
  isLike,
}: {
  uuid: string;
  isLike: boolean;
}) {
  const [likes, setLikes] = useState(isLike);

  const handleClick = async () => {
    const token = Cookies.get("token") || "";

    if (likes) {
      const result = await fetch(`${Config.API_URL}/likes/${uuid}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (result.status !== 200) {
        alert("エラーが発生しました");
        return;
      }
      setLikes(false);
    } else {
      const result = await fetch(`${Config.API_URL}/likes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ like: { uuid } }),
      });

      if (result.status !== 201) {
        alert("エラーが発生しました");
        return;
      }

      setLikes(true);
    }

    mutate(`${Config.API_URL}/likes`);
    mutate(`${Config.API_URL}/likes_all_count`);
    mutate(`${Config.API_URL}/like/${uuid}`);
  };

  return (
    <Button
      variant="filled"
      color={likes ? "rgba(255, 107, 107, 1)" : "rgba(255, 255, 255, 1)"}
      onClick={handleClick}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.35248 4.90532C1.35248 2.94498 2.936 1.35248 4.89346 1.35248C6.25769 1.35248 6.86058 1.92336 7.50002 2.93545C8.13946 1.92336 8.74235 1.35248 10.1066 1.35248C12.064 1.35248 13.6476 2.94498 13.6476 4.90532C13.6476 6.74041 12.6013 8.50508 11.4008 9.96927C10.2636 11.3562 8.92194 12.5508 8.00601 13.3664C7.94645 13.4194 7.88869 13.4709 7.83291 13.5206C7.64324 13.6899 7.3568 13.6899 7.16713 13.5206C7.11135 13.4709 7.05359 13.4194 6.99403 13.3664C6.0781 12.5508 4.73641 11.3562 3.59926 9.96927C2.39872 8.50508 1.35248 6.74041 1.35248 4.90532Z"
          fill={likes ? "rgba(255, 255, 255, 1)" : "rgba(255, 107, 107, 1)"}
          fillRule="evenodd"
          clipRule="evenodd"
        ></path>
      </svg>
    </Button>
  );
}
