import { NextRequest, NextResponse } from "next/server";
import { searchFlights } from "@/lib/rapidapi";

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get("q")?.trim() || "Bahamas";

  try {
    const data = await searchFlights(q);
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Failed to search flights",
        code: "search_failed",
      },
      { status: 500 }
    );
  }
}
