import { Suspense } from "react";
import type { Metadata } from "next";
import ListingsClient from "./listings-client";

export const metadata: Metadata = {
  title: "Browse listings",
};

export default function ListingsPage() {
  return (
    <Suspense
      fallback={
        <div className="atmosphere min-h-full px-5 py-16 text-sm text-ink-muted sm:px-8">
          Loading listings…
        </div>
      }
    >
      <ListingsClient />
    </Suspense>
  );
}
