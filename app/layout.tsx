import type { Metadata } from "next";
import "./globals.css";
import { Border } from "@/components/Border";
import { H1 } from "@/components/ui/typography";
import { QueryProvider } from "@/config/query-provider";
import { ResetButton } from "@/components/ResetButton";

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
      <body className="w-full min-h-screen flex flex-col items-center bg-purple-50 dark:bg-purple-950 overflow-x-hidden">
        <QueryProvider>
          <header className="h-20 flex items-center justify-center bg-white w-full">
            <H1>PixelBoard</H1>
            <ResetButton />
          </header>

          <Border />

          <div className="pb-8">{children}</div>

          <footer className="mt-auto h-10 bg-white w-full flex items-center justify-center">
            <a
              href="https://gmac.dev"
              target="_blank"
              className="hover:underline"
            >
              @Gwardinski
            </a>
          </footer>
        </QueryProvider>
      </body>
    </html>
  );
}
