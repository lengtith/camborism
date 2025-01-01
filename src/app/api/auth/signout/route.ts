import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    cookies().set("session", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: -1,
      path: "/"
    });

    return NextResponse.json(
      { message: "Signout successful" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
