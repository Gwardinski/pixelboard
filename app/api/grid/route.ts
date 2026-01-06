import { db } from "@/db/db";
import { tiles } from "@/db/schema";
import { asc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const result = await db.select().from(tiles).orderBy(asc(tiles.pos));

    return NextResponse.json({ tiles: result });
  } catch (error) {
    console.error("Error fetching grid:", error);
    return NextResponse.json(
      { error: "Failed to fetch grid data" },
      { status: 500 }
    );
  }
}
