import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import Providers from "./components/Providers";

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
      <body className="min-h-full flex flex-col items-center justify-center mx-auto max-w-450 px-16">
        <Providers>
         <Header />
          <div className="flex-1 p-4">
            {children}
          </div>
          <Footer /> 
        </Providers>
      </body>
    </html>
  );
}
