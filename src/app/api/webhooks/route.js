import { headers } from "next/headers";
import { Webhook } from "svix";
import { WebhookEvent } from "@clerk/nextjs/server";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

export async function POST(req) {
  // Get the headers asynchronously
  const headersList = await headers();
  const svix_id = headersList.get("svix-id");
  const svix_timestamp = headersList.get("svix-timestamp");
  const svix_signature = headersList.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.WEBHOOK_SECRET);

  let evt;

  // Verify the webhook
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400
    });
  }

  // Connect to database
  await dbConnect();

  // Handle the webhook
  try {
    switch (evt.type) {
      case "user.created":
        await UserModel.findOneAndUpdate(
          { clerkId: evt.data.id },
          {
            clerkId: evt.data.id,
            email: evt.data.email_addresses[0].email_address,
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
            profileImage: evt.data.image_url
          },
          {
            upsert: true,
            new: true,
            setDefaultsOnInsert: true
          }
        );
        break;

      case "user.updated":
        await UserModel.findOneAndUpdate(
          { clerkId: evt.data.id },
          {
            email: evt.data.email_addresses[0].email_address,
            firstName: evt.data.first_name,
            lastName: evt.data.last_name,
            profileImage: evt.data.image_url
          },
          { new: true }
        );
        break;

      case "user.deleted":
        await UserModel.findOneAndDelete({ clerkId: evt.data.id });
        break;
    }

    return new Response("Webhook processed successfully", { status: 200 });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return new Response("Error processing webhook", { status: 500 });
  }
}
