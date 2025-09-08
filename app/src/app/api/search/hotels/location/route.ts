import { NextResponse } from "next/server";
import sample from "../../../../../../samplehotels.json";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("query") ?? "";

  // return NextResponse.json(sample.data);
  const res = await fetch(
    `${process.env.BASE_URL}/hotels/searchDestination?query=${query}`,
    {
        method: "GET",
        headers: {
            "x-rapidapi-host": process.env.HOST!,
            "x-rapidapi-key": process.env.API_KEY!,
        },
    }
  );

  const data = await res.json();
  return NextResponse.json(data.data);
}
