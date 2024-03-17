import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";
import { SocketProvider } from "@/components/providers/socket-provider";

const font = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Four",
  description: "Play some four with a friend!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
      <body className={cn(font.className, "bg-white dark:bg-[#313338] h-full")}>
        <SocketProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            storageKey="four-theme"
            enableSystem
          >
            {children}
          </ThemeProvider>
        </SocketProvider>
      </body>
    </html>
  );
}
