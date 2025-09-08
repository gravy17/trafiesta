import { NextResponse } from "next/server";
import sample from "../../../../../../sampleattractions.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") ?? "";
  const lang = searchParams.get("lang") ?? "en-us";

  // return NextResponse.json(sample.data.products);
  const res = await fetch(
    `${process.env.BASE_URL}/attraction/searchLocation?query=${query}&languagecode=${lang}`,
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
