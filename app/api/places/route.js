import {
  getAllPlaces,
  insertPlace,
  updatePlace,
  deletePlace,
} from "@/db/PlaceService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

let places;

// GET all
export async function GET() {
  try {
    if (!places) {
      console.log("db called");
      places = await getAllPlaces();
    } else {
      console.log("cache hit");
    }
    return NextResponse.json(places);
  } catch (error) {
    console.error("Error fetching places:", error);
    return NextResponse.json(
      { error: "Failed to fetch places" },
      { status: 500 }
    );
  }
}

// POST new (admin only)
export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const created = await insertPlace(body);
    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating place:", error);
    return NextResponse.json(
      { error: "Failed to create place" },
      { status: 500 }
    );
  }
}

// PUT update (admin only)
export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id, updates } = await req.json();
    const updated = await updatePlace(id, updates);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating place:", error);
    return NextResponse.json(
      { error: "Failed to update place" },
      { status: 500 }
    );
  }
}

// DELETE (admin only)
export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    const deleted = await deletePlace(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting place:", error);
    return NextResponse.json(
      { error: "Failed to delete place" },
      { status: 500 }
    );
  }
}
