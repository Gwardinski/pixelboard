import { db } from "@/db/db";
import { tiles } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const result = await db
      .select()
      .from(tiles)
      .where(eq(tiles.id, parseInt(id)));

    if (result.length === 0) {
      return NextResponse.json({ error: "Tile not found" }, { status: 404 });
    }

    return NextResponse.json({ tile: result[0] });
  } catch (error) {
    console.error("Error fetching tile:", error);
    return NextResponse.json(
      { error: "Failed to fetch tile data" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const tile = await request.json();
  await db
    .update(tiles)
    .set({ colors: tile.colors })
    .where(eq(tiles.id, parseInt(id)));

  return NextResponse.json({ success: true });
}
