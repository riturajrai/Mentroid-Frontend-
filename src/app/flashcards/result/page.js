"use client";
import { useSearchParams } from "next/navigation";
import FlashcardList from "../FlashcardList/page";

export default function FlashcardResultPage() {
  const params = useSearchParams();
  const raw = params.get("data");

  let flashData = [];
  try {
    flashData = JSON.parse(decodeURIComponent(raw || "[]"));
  } catch {}

  return <FlashcardList flashData={flashData} />;
}
