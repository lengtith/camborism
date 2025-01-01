// app/api/auth/signin/route.ts
import { encrypt } from "@/src/lib/lib";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { email, password } = body;

    // Ensure required fields are present
    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    // Fetch existing users from your API
    const response = await fetch(`http://localhost:8000/users?email=${email}`, {
      method: "GET"
    });

    // Handle any errors from the fetch call
    if (!response.ok) {
      return NextResponse.json({ error: "Network error" }, { status: 500 });
    }

    const users = await response.json();

    if (!users[0]) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, users[0].password);

    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const data = { ...body, userId: users[0].id };

    // Set the session cookie
    const session = await encrypt(data);
    const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    const secure = process.env.NODE_ENV === "production";

    cookies().set("session", session, {
      expires,
      httpOnly: true,
      sameSite: "strict",
      secure,
      path: "/"
    });

    return NextResponse.json(
      { message: "Signed in successfully", ...data },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
