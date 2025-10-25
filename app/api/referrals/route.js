import {
  getAllReferrals,
  insertReferral,
  updateReferral,
  deleteReferral,
} from "@/db/ReferralService";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";


export async function GET() {
  try {
    const referrals = await getAllReferrals();
    return NextResponse.json(referrals);
  } catch (error) {
    console.error("Error fetching referrals:", error);
    return NextResponse.json(
      { error: "Failed to fetch referrals" },
      { status: 500 }
    );
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();
    const created = await insertReferral(body);
    return NextResponse.json(created);
  } catch (error) {
    console.error("Error creating referral:", error);
    return NextResponse.json(
      { error: "Failed to create referral" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id, updates } = await req.json();
    const updated = await updateReferral(id, updates);
    return NextResponse.json(updated);
  } catch (error) {
    console.error("Error updating referral:", error);
    return NextResponse.json(
      { error: "Failed to update referral" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const { id } = await req.json();
    const deleted = await deleteReferral(id);
    return NextResponse.json(deleted);
  } catch (error) {
    console.error("Error deleting referral:", error);
    return NextResponse.json(
      { error: "Failed to delete referral" },
      { status: 500 }
    );
  }
}
