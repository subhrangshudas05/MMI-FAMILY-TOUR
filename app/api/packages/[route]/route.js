import { getPackageByRoute } from "@/db/PackageService";
import { NextResponse } from "next/server";

/**
 * ✅ GET single package by route
 * URL: /api/packages/[route]
 * Example: /api/packages/everest-base-camp
 */
export async function GET(req, { params }) {
  try {
    const { route } = params;
    const pkg = await getPackageByRoute(route);
    
    if (!pkg) {
      return NextResponse.json({ error: "Package not found" }, { status: 404 });
    }
    
    return NextResponse.json(pkg);
  } catch (error) {
    console.error("Error fetching package:", error);
    return NextResponse.json({ error: "Failed to fetch package" }, { status: 500 });
  }
}