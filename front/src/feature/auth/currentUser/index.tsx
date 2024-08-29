"use client";

import Cookies from "js-cookie";
import { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Config } from "@/config";
import { userState } from "@/recoil";

export default function CurrentUser() {
  const setUser = useSetRecoilState(userState);

  const autoLogin = useCallback(
    async (token: string) => {
      const res = await fetch(`${Config.API_URL}/users`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        Cookies.remove("token");
        setUser({ uuid: "", name: "" });
        return;
      }
      const data = await res.json();
      setUser(data);
    },
    [setUser],
  );

  useEffect(() => {
    const token = Cookies.get("token") || "";
    autoLogin(token);
  }, [autoLogin]);

  return null;
}
