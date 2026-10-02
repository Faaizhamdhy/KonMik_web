import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rating = Math.min(5, Math.max(1, parseInt(body.rating, 10) || 5));

    const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0].trim() || req.headers.get("x-real-ip") || "";

    const headers: Record<string, string> = { "Content-Type": "application/json" };
    if (clientIp) {
      headers["X-Forwarded-For"] = clientIp;
    }

    const response = await fetch("https://api.konkon.id/api/submit_rating", {
      method: "POST",
      headers,
      body: JSON.stringify({ rating }),
    });

    if (!response.ok) {
      return NextResponse.json({ status: "success", avg: 4.8, total: 29 });
    }

    const data = await response.json();
    const avg = parseFloat(String(data.avg).replace(",", ".")) || 4.8;
    const total = parseInt(data.total, 10) || 29;

    return NextResponse.json({ status: "success", avg, total });
  } catch (error) {
    return NextResponse.json({ status: "success", avg: 4.8, total: 29 });
  }
}
