import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ashutoshpalhare.github.io"),
  title: "Ashutosh Palhare — Full Stack Developer",
  description: "Portfolio of Ashutosh Palhare, a frontend-first full stack developer and cybersecurity enthusiast from Maharashtra, India.",
  keywords: [
    "Ashutosh Palhare",
    "Full Stack Developer",
    "Frontend Developer",
    "React Developer",
    "TypeScript",
    "Cybersecurity",
    "Maharashtra",
  ],
  authors: [{ name: "Ashutosh Palhare", url: "https://github.com/ashutoshpalhare" }],
  creator: "Ashutosh Palhare",
  alternates: { canonical: "/" },
  icons: { icon: "/favicon.svg" },
  openGraph: {
    title: "Ashutosh Palhare — Full Stack Developer",
    description: "Frontend-first developer building clean interfaces, useful tools, and modern web products.",
    url: "https://ashutoshpalhare.github.io",
    siteName: "Ashutosh Palhare Portfolio",
    type: "website",
    images: [{ url: "https://avatars.githubusercontent.com/u/53346137?v=4", width: 460, height: 460, alt: "Ashutosh Palhare" }],
  },
  twitter: {
    card: "summary",
    title: "Ashutosh Palhare — Full Stack Developer",
    description: "Frontend-first developer • Cybersecurity enthusiast • Building useful things for the web.",
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
