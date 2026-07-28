"use server";

import { revalidatePath } from "next/cache";
import { createListing } from "@/lib/listings";
import type { ContactMethod, ListingInput, PlatformId } from "@/lib/types";

export type CreateListingState = {
  error?: string;
  id?: string;
};

function cleanContact(raw: ContactMethod): ContactMethod {
  const contact: ContactMethod = {};
  (Object.keys(raw) as Array<keyof ContactMethod>).forEach((key) => {
    const value = raw[key]?.trim();
    if (value) contact[key] = value;
  });
  return contact;
}

export async function createListingAction(
  _prev: CreateListingState,
  formData: FormData,
): Promise<CreateListingState> {
  const platform = String(formData.get("platform") ?? "") as PlatformId;
  const title = String(formData.get("title") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const sellerName = String(formData.get("sellerName") ?? "").trim();
  const creditAmount = Number(formData.get("creditAmount"));
  const creditUnit = String(formData.get("creditUnit") ?? "") as
    | "USD"
    | "credits"
    | "tokens";
  const priceUSD = Number(formData.get("priceUSD"));

  const contact = cleanContact({
    email: String(formData.get("email") ?? ""),
    phone: String(formData.get("phone") ?? ""),
    whatsapp: String(formData.get("whatsapp") ?? ""),
    telegram: String(formData.get("telegram") ?? ""),
    discord: String(formData.get("discord") ?? ""),
    reddit: String(formData.get("reddit") ?? ""),
  });

  if (!title || !description || !sellerName) {
    return { error: "Please fill in title, description, and your name." };
  }
  if (!Number.isFinite(creditAmount) || creditAmount <= 0) {
    return { error: "Enter a valid credit amount greater than zero." };
  }
  if (!["USD", "credits", "tokens"].includes(creditUnit)) {
    return { error: "Choose a valid credit unit." };
  }
  if (!Number.isFinite(priceUSD) || priceUSD <= 0) {
    return { error: "Enter a valid asking price greater than zero." };
  }
  if (Object.keys(contact).length === 0) {
    return { error: "Add at least one contact method so buyers can reach you." };
  }

  const input: ListingInput = {
    platform,
    title,
    description,
    creditAmount,
    creditUnit,
    priceUSD,
    sellerName,
    contact,
  };

  try {
    const listing = await createListing(input);
    revalidatePath("/");
    revalidatePath("/listings");
    revalidatePath(`/listings/${listing.id}`);
    return { id: listing.id };
  } catch (error) {
    console.error("Failed to create listing", error);
    return { error: "Could not save listing to the database. Please try again." };
  }
}
