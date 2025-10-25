import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { 
  insertReview, 
  getApprovedReviews,
  getAllReviewsForAdmin,
  updateReviewApproval,
  updateReviewOrder,
  deleteReview
} from "@/db/ReviewService";


export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    let reviews;
    if (session?.user?.role === 'admin') {
      reviews = await getAllReviewsForAdmin();
    } else {
      reviews = await getApprovedReviews();
    }
    
    return NextResponse.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return NextResponse.json({ error: "Failed to fetch reviews." }, { status: 500 });
  }
}

/**
 * POST - Public. Saves a new review, which will be unapproved by default.
 */
export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.pkgTitle || !body.name || !body.stars) {
      return NextResponse.json({ error: "Package title, name, and star rating are required." }, { status: 400 });
    }
    if (typeof body.stars !== 'number' || body.stars < 1 || body.stars > 5) {
        return NextResponse.json({ error: "Star rating must be a number between 1 and 5." }, { status: 400 });
    }

    const created = await insertReview(body);
    return NextResponse.json({ message: "Review submitted successfully! Awaiting approval.", data: created }, { status: 201 });

  } catch (err) {
    console.error("Error creating review:", err);
    return NextResponse.json({ error: "Failed to save review." }, { status: 500 });
  }
}

/**
 * PUT - Admin only. Updates approval status or display order.
 */
export async function PUT(req) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
  }

  try {
    const body = await req.json();

    if (body.action === 'updateApproval') {
      const { id, approved, displayOrder } = body;
      const updatedReview = await updateReviewApproval(id, approved, displayOrder);
      return NextResponse.json(updatedReview);
    }
    
    if (body.action === 'updateOrder') {
        const { orderUpdates } = body;
        await updateReviewOrder(orderUpdates);
        return NextResponse.json({ message: 'Order updated successfully' });
    }

    return NextResponse.json({ error: 'Invalid action.' }, { status: 400 });

  } catch (err) {
    console.error("Error updating review:", err);
    return NextResponse.json({ error: "Failed to update review." }, { status: 500 });
  }
}

/**
 * DELETE - Admin only. Deletes a review.
 */
export async function DELETE(req) {
    const session = await getServerSession(authOptions);

    if (!session || session.user.role !== "admin") {
        return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    try {
        const { id } = await req.json();
        if (!id) {
            return NextResponse.json({ error: "Review ID is required." }, { status: 400 });
        }
        await deleteReview(id);
        return NextResponse.json({ message: "Review deleted successfully." });
    } catch (err) {
        console.error("Error deleting review:", err);
        return NextResponse.json({ error: "Failed to delete review." }, { status: 500 });
    }
}

