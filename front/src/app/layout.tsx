import type { Metadata } from "next";
import { Zen_Kaku_Gothic_Antique } from "next/font/google";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import "./globals.css";
import { Footer } from "@/components/layout";

const zenKakuGothicAntique = Zen_Kaku_Gothic_Antique({
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "会話デッキ",
  description: "会話に困る、そんなときにオススメの会話デッキ！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className={zenKakuGothicAntique.className}>
        <MantineProvider>
          <div className="w-full min-h-screen flex flex-col justify-center items-center">
            <div className="w-full flex-grow">{children}</div>
            <Footer />
          </div>
        </MantineProvider>
      </body>
    </html>
  );
}
