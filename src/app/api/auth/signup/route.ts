import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    // Ensure required fields are present
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const res = await fetch("http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: crypto.randomUUID(),
        name,
        email,
        password: hashedPassword
      })
    });

    if (res.ok) {
      return NextResponse.json(
        { message: "Signup successful" },
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
