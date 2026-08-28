import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MUHAMMAD | Full-Stack Developer",
  description:
    "MUHAMMAD - Full-stack software developer specializing in building exceptional digital experiences. Explore my projects, skills, and experience.",
  keywords: [
    "software developer",
    "full-stack developer",
    "portfolio",
    "web development",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "MUHAMMAD" }],
  icons: {
    icon: "https://z-cdn.chatglm.cn/z-ai/static/logo.svg",
  },
  openGraph: {
    title: "MUHAMMAD | Full-Stack Developer",
    description:
      "MUHAMMAD - Full-stack software developer specializing in building exceptional digital experiences.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MUHAMMAD | Full-Stack Developer",
    description:
      "MUHAMMAD - Full-stack software developer specializing in building exceptional digital experiences.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
