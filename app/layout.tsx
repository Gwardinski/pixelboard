import type { Metadata } from "next";
import "./globals.css";
import { Border } from "@/components/Border";
import { H1 } from "@/components/ui/typography";
import { QueryProvider } from "@/config/query-provider";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PixelBoard",
  description: "Collaborative Pixel Art Editor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="w-full min-h-screen flex flex-col items-center overflow-x-hidden bg-pattern">
        <div className="fixed top-0 left-0 -z-10 h-screen min-h-screen w-screen object-cover backdrop-blur-2xl" />
        <QueryProvider>
          <header className="h-20 flex items-center flex-col justify-center w-full glass dark:dark-glass">
            <Link
              href="/"
              className="flex flex-col items-center justify-center"
            >
              <>
                <H1>PixelBoard</H1>
                <Border />
              </>
            </Link>
          </header>

          {children}

          <footer className="mt-auto h-10 w-full flex items-center justify-center glass dark:dark-glass">
            <a
              href="https://gmac.dev"
              target="_blank"
              className="hover:underline"
            >
              gmac.dev
            </a>
            {/* <TailwindBreakpoints /> */}
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
