import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error("Error fetching issues:", error);
    return NextResponse.json(
      { success: false, message: "Some services not working" },
      { status: 500 }
    );
  }
}
