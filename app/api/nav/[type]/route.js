// app/api/nav/[type]/id.js
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import {
  getAllNav,
  insertNavItem,
  updateNavItem,
  deleteNavItem,
} from "@/db/NavServices.js";

let popular, india;

/**
 * GET = Public (anyone can fetch navigation data)
 */
export async function GET(req, { params }) {
  const { type } = await params;
  try {
    if (type == "popular") {
      if (popular) {
        return NextResponse.json(popular);
      }
      popular = await getAllNav(type);
      return NextResponse.json(popular);
    }
    if (type == "india") {
      if (india) {
        return NextResponse.json(india);
      }
      india = await getAllNav(type);
      return NextResponse.json(india);
    }
  } catch (err) {
    console.error("Error fetching navigation data:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * POST = Admin only (insert one)
 */
export async function POST(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { type } = await params;

  try {
    const body = await req.json();
    const created = await insertNavItem(type, body);
    return NextResponse.json(created);
  } catch (err) {
    console.error("Error creating nav item:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * PUT = Admin only (update by id)
 */
export async function PUT(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { type } = await params;

  try {
    const { id, updates } = await req.json();
    const updated = await updateNavItem(type, id, updates);
    return NextResponse.json(updated);
  } catch (err) {
    console.error("Error updating nav item:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * DELETE = Admin only (delete by id)
 */
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  const { type } = await params;

  try {
    const { id } = await req.json();
    const deleted = await deleteNavItem(type, id);
    return NextResponse.json(deleted);
  } catch (err) {
    console.error("Error deleting nav item:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
