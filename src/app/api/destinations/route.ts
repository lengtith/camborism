import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";
  const page = searchParams.get("_page") || "1";
  const search = query ? `&q=${query}` : "";

  try {
    const response = await fetch(
      `http://localhost:8000/destinations?_page=${page}&_limit=9${search}`
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch posts" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json({ data }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const res = await fetch("http://localhost:8000/destinations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        ...body
      })
    });

    if (res.ok) {
      return NextResponse.json(
        { message: "Create successful" },
        { status: 201 }
      );
    } else {
      const errorData = await res.json();
      return NextResponse.json(
        { error: errorData.message },
        { status: res.status }
      );
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
