import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const rating = Math.min(5, Math.max(1, parseInt(body.rating, 10) || 5));

    const response = await fetch("https://konmik.konkon.id/api/submit_rating.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
