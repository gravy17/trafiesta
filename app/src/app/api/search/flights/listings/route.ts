import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("fromId") ?? "LOS.AIRPORT";
    const to = searchParams.get("toId") ?? "";
    const departDate = searchParams.get("departDate") ?? "2025-09-08"
    // const stops = searchParams.get("stops") ?? "none";
    // const adults = searchParams.get("adults") ?? "1";
    // const children = searchParams.get("children") ?? "0";
    // const page = searchParams.get("pageNo") ?? "1";
    // const sort = searchParams.get("sort") ?? "BEST";
    // const cabinClass = searchParams.get("cabinClass") ?? "ECONOMY";
    const currency = searchParams.get("currency_code") ?? "NGN";

  const res = await fetch(
    `${process.env.BASE_URL}/flights/searchFlights?fromId=${from}&toId=${to}&departDate=${departDate}&currency_code=${currency}`,
    {
        method: "GET",
        headers: {
            "x-rapidapi-host": process.env.HOST!,
            "x-rapidapi-key": process.env.API_KEY!,
        },
    }
  );

  const data = await res.json();
  return NextResponse.json(data.data.flightOffers);
}
