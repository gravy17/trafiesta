import { NextResponse } from "next/server";
import sample from "../../../../../../sampleflights.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") ?? "";
  const lang = searchParams.get("lang") ?? "en-us";

  // return NextResponse.json(sample.data);
  const res = await fetch(
    `${process.env.BASE_URL}/flights/searchDestination?query=${query}&languagecode=${lang}`,
    {
        method: "GET",
        headers: {
            "x-rapidapi-host": process.env.HOST!,
            "x-rapidapi-key": process.env.API_KEY!,
        },
    }
  );

  const data = await res.json();
  console.log(data);
  return NextResponse.json(data.data);
}
