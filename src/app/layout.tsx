import type { Metadata } from "next";
import "./globals.css";
import Header from "../../Header";
import Footer from "./components/common/Footer";
import Providers from "./components/Providers";

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
      className={`h-full antialiased`}
    >
      <body className="min-h-full flex flex-col mx-auto max-w-450 px-16">
        <Providers>
         <Header />
          <main className="flex-1 wrapper justify-start h-full font-sans w-full px-10 py-2">
            {children}
          </main>
          <Footer /> 
        </Providers>
      </body>
    </html>
  );
}
