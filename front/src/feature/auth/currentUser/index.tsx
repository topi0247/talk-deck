"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { Config } from "@/config";
import { useSetRecoilState } from "recoil";
import { userState } from "@/recoil";

export default function CurrentUser() {
  const setUser = useSetRecoilState(userState);

  useEffect(() => {
    const token = Cookies.get("token") || "";
    autoLogin(token);
  }, []);

  const autoLogin = async (token: string) => {
    const res = await fetch(`${Config.API_URL}/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      Cookies.remove("token");
      setUser({ name: "" });
      return;
    }
    const data = await res.json();
    setUser(data);
  };

  return null;
}
