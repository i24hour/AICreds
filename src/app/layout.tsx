import type { Metadata } from "next";
import { Figtree, Syne } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { ListingsProvider } from "@/lib/listings-context";
import "./globals.css";

const display = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const body = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "AICreds — Buy & sell AI platform credits",
    template: "%s · AICreds",
  },
  description:
    "List unused OpenAI, Anthropic, Azure, and other AI credits. Set your price and share how buyers can reach you.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full`}>
      <body className="flex min-h-full flex-col antialiased">
        <ListingsProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </ListingsProvider>
      </body>
    </html>
  );
}
