import { getAllBookings, insertBooking, updateBooking, deleteBooking } from "@/db/BookingService";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { NextResponse } from "next/server";



export async function GET() {
  const bookings = await getAllBookings();
  return NextResponse.json(bookings);
}

export async function POST(req) {
  // No auth required - users can create bookings
  try {
    const body = await req.json();
    const created = await insertBooking(body);
    return NextResponse.json(created);
  } catch (error) {
    console.log("=== API ERROR ===");
    console.log("Error message:", error.message);
    console.log("Error name:", error.name);
    console.log("Full error:", error);
    return NextResponse.json({ error: "Failed to create booking" }, { status: 400 });
  }
}

export async function PUT(req) {
  // Admin only for updating bookings
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }
  try {
    const { id, updates } = await req.json();
    const updated = await updateBooking(id, updates);
    return NextResponse.json(updated);
  } catch (error) {
    console.log("=== API ERROR ===");
    console.log("Error message:", error.message);
    console.log("Error name:", error.name);
    console.log("Full error:", error);
    return NextResponse.json({ error: "Failed to update booking" }, { status: 400 });
  }
}

export async function DELETE(req) {
  // Admin only for deleting bookings
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    const deleted = await deleteBooking(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.log("=== API ERROR ===");
    console.log("Error message:", error.message);
    console.log("Error name:", error.name);
    console.log("Full error:", error);
    return NextResponse.json({ error: "Failed to delete booking" }, { status: 400 });
  }
}