import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

const siteUrl = "https://ashutoshpalhare.github.io/ashfolio/";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Ashutosh Palhare — Full Stack Developer",
  description:
    "Portfolio of Ashutosh Palhare, a frontend-first full stack developer and cybersecurity enthusiast from Maharashtra, India.",
  keywords: [
    "Ashutosh Palhare",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "TypeScript Developer",
    "Web Developer India",
    "Cybersecurity",
    "Maharashtra",
  ],
  authors: [{ name: "Ashutosh Palhare", url: "https://github.com/ashutoshpalhare" }],
  creator: "Ashutosh Palhare",
  alternates: { canonical: siteUrl },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Ashutosh Palhare — Full Stack Developer",
    description:
      "Frontend-first developer building clean interfaces, useful tools, and modern web products.",
    url: siteUrl,
    siteName: "Ashutosh Palhare Portfolio",
    type: "website",
    images: [
      {
        url: "https://avatars.githubusercontent.com/u/53346137?v=4",
        width: 460,
        height: 460,
        alt: "Ashutosh Palhare",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ashutosh Palhare — Full Stack Developer",
    description:
      "Frontend-first developer • Cybersecurity enthusiast • Building useful things for the web.",
    images: ["https://avatars.githubusercontent.com/u/53346137?v=4"],
    creator: "@AshutoshPalhare",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#05050a",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
