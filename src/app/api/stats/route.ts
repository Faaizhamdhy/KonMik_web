import { NextResponse } from "next/server";
import { getAppStats } from "@/lib/stats";

export const revalidate = 15;

export async function GET() {
  const stats = await getAppStats();
  return NextResponse.json(stats);
}
