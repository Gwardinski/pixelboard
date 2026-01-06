import { db } from "@/db/db";
import { tiles } from "@/db/schema";
import { NextResponse } from "next/server";
import { create16By16GridForTiles } from "@/config/seed";

export async function POST(request: Request) {
  const { code } = await request.json();

  if (code !== process.env.NEXT_PUBLIC_RESET_CODE) {
    return NextResponse.json({ error: "Invalid code" }, { status: 401 });
  }

  try {
    await db.delete(tiles);

    const newTiles = create16By16GridForTiles();

    await db.insert(tiles).values(newTiles);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error resetting grid:", error);
    return NextResponse.json(
      { error: "Failed to reset grid" },
      { status: 500 }
    );
  }
}
