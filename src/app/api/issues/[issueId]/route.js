import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import IssueModel from "@/models/Issue";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
  try {
    const { userId } = getAuth(request);
    if (!userId) {
      return NextResponse.json(
        { success: false, message: "Not authenticated" },
        { status: 401 }
      );
    }

    await dbConnect();
    const { voteType } = await request.json();

    const updateField = `votes.${voteType}`;
    const issue = await IssueModel.findByIdAndUpdate(
      params.issueId,
      { $inc: { [updateField]: 1 } },
      { new: true }
    );

    return NextResponse.json(
      { success: true, issue },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error voting:", error);
    return NextResponse.json(
      { success: false, message: "Failed to vote" },
      { status: 500 }
    );
  }
}
