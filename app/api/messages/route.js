import { NextResponse } from "next/server";
import { insertMessage, getAllMessages, deleteMessage } from "@/db/MessageService";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

/**
 * GET = Admin only. Fetches all messages, newest first.
 */
export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const messages = await getAllMessages();
    return NextResponse.json(messages);
  } catch (err) {
    console.error("Error fetching messages:", err);
    return NextResponse.json({ error: "Failed to fetch messages." }, { status: 500 });
  }
}

/**
 * POST = Public endpoint to receive and save a new message.
 */
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.fullName || !body.email || !body.phone || !body.message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const created = await insertMessage(body);
    return NextResponse.json({ message: "Message received successfully!", data: created }, { status: 201 });

  } catch (err) {
    console.error("Error creating message:", err);
    return NextResponse.json({ error: "Failed to save message." }, { status: 500 });
  }
}

/**
 * DELETE = Admin only. Deletes a message by its ID.
 */
export async function DELETE(req) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Message ID is required." }, { status: 400 });
        }

        const deleted = await deleteMessage(id);

        if (!deleted) {
             return NextResponse.json({ error: "Message not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Message deleted successfully!", data: deleted });

    } catch (err) {
        console.error("Error deleting message:", err);
        return NextResponse.json({ error: "Failed to delete message." }, { status: 500 });
    }
}