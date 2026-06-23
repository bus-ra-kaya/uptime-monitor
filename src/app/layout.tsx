import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/common/header";
import Footer from "./components/common/footer";

const rubik = Rubik({
  variable: "--rubik",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Uptime Monitor",
  description: "A web app for monitoring availability of endpoints",
  icons: {
    icon: [
      {url: "/favicon.svg", type: "image/svg+xml"},
      {url: "/favicon.png", type: "image/png"} 
    ]
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html
      lang="en"
      className={`${rubik.variable} h-full antialiased`}
    >
      <body className="min-h-full flex mx-auto flex-col w-full max-w-8xl">
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
