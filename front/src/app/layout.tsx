import { MantineProvider } from "@mantine/core";
import type { Metadata } from "next";
import { Zen_Kaku_Gothic_Antique } from "next/font/google";
import React from "react";
import "@mantine/core/styles.css";
import "./globals.css";

const zenKakuGothicAntique = Zen_Kaku_Gothic_Antique({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "会話デッキ",
  description: "会話に困る、そんなときにオススメの会話デッキ！",
  openGraph: {
    title: "会話デッキ",
    description: "会話に困る、そんなときにオススメの会話デッキ！",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "会話デッキ",
    type: "website",
    images: `${process.env.NEXT_PUBLIC_APP_URL}/ogp.png`,
  },
  twitter: {
    card: "summary_large_image",
    title: "会話デッキ",
    description: "会話に困る、そんなときにオススメの会話デッキ！",
    images: `${process.env.NEXT_PUBLIC_APP_URL}/ogp.png`,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={zenKakuGothicAntique.className}>
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
