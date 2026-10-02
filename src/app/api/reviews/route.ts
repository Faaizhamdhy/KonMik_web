import { NextResponse } from "next/server";
import { getPublicReviews } from "@/lib/stats";

export const revalidate = 20;

export async function GET() {
  const reviews = await getPublicReviews();
  return NextResponse.json(reviews);
}
