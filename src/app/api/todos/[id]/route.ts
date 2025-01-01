import { NextRequest, NextResponse } from "next/server";

export async function PATCH(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    // Check if ID is provided
    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      );
    }

    // Read the body content asynchronously
    const body = await req.json();

    // Make the PATCH request to json-server
    const res = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    // Check if the update was successful
    if (!res.ok) {
      return NextResponse.json(
        { message: "Todo not found or update failed" },
        { status: 404 }
      );
    }

    // Respond with success message
    return NextResponse.json(
      { message: "Todo updated successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    // Handle unexpected errors
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { error: "ID parameter is required" },
        { status: 400 }
      );
    }

    const res = await fetch(`http://localhost:8000/todos/${id}`, {
      method: "DELETE"
    });

    if (!res.ok) {
      return NextResponse.json({ message: "Todo not found" }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Item deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
