import type { Metadata } from "next";
import { Noto_Sans_KR } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "언약 시트 생성기 · FFXIV",
  description: "파이널 판타지 14 언약 시트 생성기",
  icons: {
    icon: "/heart.png",
  },
  openGraph: {
    images: [{ url: "/meta.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSansKr.variable} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
