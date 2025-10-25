import { getAllPackages, insertPackage, updatePackage, deletePackage } from "@/db/PackageService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";



/**
 * ✅ GET all packages (public)
 */
export async function GET() {
  try {
    const packages = await getAllPackages();
    return NextResponse.json(packages);
  } catch (error) {
    console.error("Error fetching packages:", error);
    return NextResponse.json({ error: "Failed to fetch packages" }, { status: 500 });
  }
}

/**
 * ✅ POST: Create a package (admin only)
 */
export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const created = await insertPackage(body);
    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating package:", error);
    return NextResponse.json({ error: "Failed to create package" }, { status: 500 });
  }
}

/**
 * ✅ PUT: Update a package by id (admin only)
 */
export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id, updates } = await req.json();
    const updated = await updatePackage(id, updates);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update package" }, { status: 500 });
  }
}

/**
 * ✅ DELETE: Remove a package by id (admin only)
 */
export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    const deleted = await deletePackage(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting package:", error);
    return NextResponse.json({ error: "Failed to delete package" }, { status: 500 });
  }
}