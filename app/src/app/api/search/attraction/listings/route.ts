import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id") ?? "";
    const page = searchParams.get("pageNo") ?? "1";
    const sort = searchParams.get("sort") ?? "trending";
    const currency = searchParams.get("currency_code") ?? "NGN";
    const lang = searchParams.get("language_code") ?? "en-us";

  const res = await fetch(
    `${process.env.BASE_URL}/attraction/searchAttractions?id=${id}&sortBy=${sort}&page=${page}&currency_code=${currency}&languagecode=${lang}`,
    {
        method: "GET",
        headers: {
            "x-rapidapi-host": process.env.HOST!,
            "x-rapidapi-key": process.env.API_KEY!,
        },
    }
  );

  const data = await res.json();
  return NextResponse.json(data.data.products);
}
