import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Picnic | 도시락 배달과 케이터링 예약",
  description: "도시락 배달과 케이터링 예약을 간편하게 접수하는 Picnic MVP",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <header className="site-header">
          <Link href="/" className="brand" aria-label="Picnic 홈">
            Picnic
          </Link>
          <nav className="top-nav" aria-label="주요 메뉴">
            <Link href="/menu">메뉴</Link>
            <Link href="/reserve">예약</Link>
            <Link href="/admin">관리자</Link>
          </nav>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
