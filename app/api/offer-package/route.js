import {
  getAllOfferPackages,
  insertOfferPackage,
  updateOfferPackage,
  deleteOfferPackage,
} from "@/db/OfferPackageService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


let offers
/**
 * ✅ GET all offer packages (public)
 */
export async function GET() {
  try {
    console.log("🔍 API: Starting to fetch offer packages...");
    
    if(!offers) {
      console.log("db called");
      offers = await getAllOfferPackages();
    }else {
      console.log("cache hit");
    }
    
    // console.log("🔍 API: Offers count:", offers?.length);
    
    // Ensure we return an array
    const responseData = Array.isArray(offers) ? offers : [];
        
    return NextResponse.json(responseData);
  } catch (error) {
    console.error("❌ API: Error fetching offer packages:", error);
    return NextResponse.json({ error: "Failed to fetch offer packages" }, { status: 500 });
  }
}

/**
 * ✅ POST: Create new offer package (admin only)
 */
export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const created = await insertOfferPackage(body);
    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating offer package:", error);
    return NextResponse.json({ error: "Failed to create offer package" }, { status: 500 });
  }
}

/**
 * ✅ PUT: Update offer package by id (admin only)
 */
export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id, updates } = await req.json();
    const updated = await updateOfferPackage(id, updates);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating offer package:", error);
    return NextResponse.json({ error: "Failed to update offer package" }, { status: 500 });
  }
}

/**
 * ✅ DELETE: Remove offer package by id (admin only)
 */
export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    const deleted = await deleteOfferPackage(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting offer package:", error);
    return NextResponse.json({ error: "Failed to delete offer package" }, { status: 500 });
  }
}