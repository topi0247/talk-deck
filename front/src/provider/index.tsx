"use client";
import { MantineProvider } from "@mantine/core";
import React from "react";
import { RecoilRoot } from "recoil";

export default function Provider({ children }: { children: React.ReactNode }) {
  return (
    <RecoilRoot>
      <MantineProvider>{children}</MantineProvider>
    </RecoilRoot>
  );
}
