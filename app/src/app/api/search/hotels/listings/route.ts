import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const dest = searchParams.get("dest_id") ?? "-2092174";
    const type = searchParams.get("search_type") ?? "CITY";
    const rooms = searchParams.get("room_qty") ?? "1";
    const adults = searchParams.get("adults") ?? "1";
    const children = searchParams.get("children") ?? "0";
    const page = searchParams.get("pageNo") ?? "1";
    const currency = searchParams.get("currency_code") ?? "NGN";
    const location = searchParams.get("location") ?? "NG";
    const lang = searchParams.get("language_code") ?? "en-us";

  const res = await fetch(
    `${process.env.BASE_URL}/hotels/searchHotels?dest_id=${dest}&page_number=${page}&languagecode=${lang}&currency_code=${currency}`,
    {
        method: "GET",
        headers: {
            "x-rapidapi-host": process.env.HOST!,
            "x-rapidapi-key": process.env.API_KEY!,
        },
    }
  );

  const data = await res.json();
  return NextResponse.json(data.data.hotels);
}
