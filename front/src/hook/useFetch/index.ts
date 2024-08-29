"use client";
import Cookies from "js-cookie";
import useSWR from "swr";
import { Config } from "@/config";

const fetcher = (props: string[]) => {
  return fetch(`${Config.API_URL}${props[0]}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${props[1]}`,
    },
  }).then((res) => res.json());
};

export default function useFetch(url: string) {
  const token = Cookies.get("token");
  const { data, error } = useSWR([url, token], { fetcher });
  if (!data) return { loading: true, error: false, data: null };
  if (error) return { loading: false, error: true, data: null };
  return { loading: false, error: false, data };
}
