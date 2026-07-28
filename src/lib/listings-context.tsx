"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { SEED_LISTINGS } from "@/data/seed";
import { createId } from "@/lib/format";
import type { Listing, ListingInput, PlatformId } from "@/lib/types";

const STORAGE_KEY = "aicreds.user-listings.v1";
const EMPTY: Listing[] = [];

type ListingsContextValue = {
  listings: Listing[];
  ready: boolean;
  addListing: (input: ListingInput) => Listing;
  getListing: (id: string) => Listing | undefined;
  filterByPlatform: (platform: PlatformId | "all") => Listing[];
};

const ListingsContext = createContext<ListingsContextValue | null>(null);

let cachedRaw: string | null | undefined;
let cachedListings: Listing[] = EMPTY;

function parseListings(raw: string | null): Listing[] {
  if (!raw) return EMPTY;
  try {
    const parsed = JSON.parse(raw) as Listing[];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

function readUserListings(): Listing[] {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw) return cachedListings;
  cachedRaw = raw;
  cachedListings = parseListings(raw);
  return cachedListings;
}

function subscribe(onStoreChange: () => void) {
  const handler = () => onStoreChange();
  window.addEventListener("storage", handler);
  window.addEventListener("aicreds-listings-changed", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("aicreds-listings-changed", handler);
  };
}

function getSnapshot(): Listing[] {
  return readUserListings();
}

function getServerSnapshot(): Listing[] {
  return EMPTY;
}

function writeUserListings(listings: Listing[]) {
  const raw = JSON.stringify(listings);
  window.localStorage.setItem(STORAGE_KEY, raw);
  cachedRaw = raw;
  cachedListings = listings;
  window.dispatchEvent(new Event("aicreds-listings-changed"));
}

export function ListingsProvider({ children }: { children: ReactNode }) {
  const userListings = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  const ready = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const listings = useMemo(() => {
    const merged = [...userListings, ...SEED_LISTINGS];
    return merged.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  }, [userListings]);

  const addListing = useCallback((input: ListingInput) => {
    const listing: Listing = {
      ...input,
      id: createId(),
      createdAt: new Date().toISOString(),
      featured: false,
    };
    const next = [listing, ...readUserListings()];
    writeUserListings(next);
    return listing;
  }, []);

  const getListing = useCallback(
    (id: string) => listings.find((l) => l.id === id),
    [listings],
  );

  const filterByPlatform = useCallback(
    (platform: PlatformId | "all") => {
      if (platform === "all") return listings;
      return listings.filter((l) => l.platform === platform);
    },
    [listings],
  );

  const value = useMemo(
    () => ({ listings, ready, addListing, getListing, filterByPlatform }),
    [listings, ready, addListing, getListing, filterByPlatform],
  );

  return (
    <ListingsContext.Provider value={value}>{children}</ListingsContext.Provider>
  );
}

export function useListings() {
  const ctx = useContext(ListingsContext);
  if (!ctx) throw new Error("useListings must be used within ListingsProvider");
  return ctx;
}
