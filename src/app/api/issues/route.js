import { getAuth } from '@clerk/nextjs/server';
import dbConnect from '@/lib/dbConnect';
import IssueModel from '@/models/Issue';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    // Get the auth context
    const { userId } = getAuth(request);

    if (!userId) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Fetch issues from database
    const issues = await IssueModel.find()
      .sort({ createdAt: -1 })
      .populate('createdBy', 'clerkId name email');

    return NextResponse.json(
      { success: true, issues },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching issues:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to fetch issues' },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const { userId, mongoUser } = getAuth(request);

    if (!userId || !mongoUser) {
      return NextResponse.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    await dbConnect();
    const issueData = await request.json();

    const newIssue = await IssueModel.create({
      ...issueData,
      createdBy: mongoUser._id, // Now using MongoDB user ID
      status: 'Open',
      inPolling: false,
      votes: { up: 0, down: 0 },
      createdAt: new Date()
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Issue created successfully',
        issue: newIssue
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating issue:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to create issue' },
      { status: 500 }
    );
  }
}
