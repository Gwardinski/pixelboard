"use client";

import { Button } from "@/components/ui";
import { useGridState } from "@/config/state";
import { colorValues, PixelBlock } from "@/config/types";
import { colorToCss } from "@/config/formatters";
import { useTile, useUpdatePixel } from "@/config/query-hooks";
import Link from "next/link";
import { use, useState } from "react";

export default function TilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = use(params);
  const tileId = resolvedParams.id;

  // Fetch tile data
  const { data, error } = useTile(tileId);

  if (error || !data) {
    return null;
  }

  const { tile } = data;

  return (
    <section className="flex flex-col items-center w-fit max-w-6xl overflow-hidden">
      <header className="flex items-center justify-between py-4 w-full text-left px-2">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold">Tile {tile?.id}</h2>
          <p>Select a Color, then click a pixel to fill it in</p>
        </div>
        <Link href={"/"} className="ml-auto">
          <Button>Close</Button>
        </Link>
      </header>
      <ColorButtons />
      <PixelGrid tileId={tileId} />
    </section>
  );
}

const PixelGrid: React.FC<{ tileId: string }> = ({ tileId }) => {
  const { data: tile, error } = useTile(tileId);

  if (error || !tile) {
    return null;
  }

  const { pixels } = tile;

  return (
    <div className="no-scrollbar flex flex-col max-w-5xl px-2 lg:px-0 w-screen items-start lg:items-center overflow-auto">
      {pixels.map((pixel, i) => (
        <div key={`pixel-row-${i}`} className="flex overflow-hidden">
          {pixel.map((pixel) => (
            <PixelItem key={pixel.id} pixel={pixel} tileId={tileId} />
          ))}
        </div>
      ))}
    </div>
  );
};

const PixelItem: React.FC<{
  pixel: PixelBlock;
  tileId: string;
}> = ({ pixel, tileId }) => {
  const { data: tile, error } = useTile(tileId);
  const { mutate: updatePixel, isPending } = useUpdatePixel(tileId);
  const selectedColor = useGridState((state) => state.selectedColor);
  const [isHovered, setIsHovered] = useState(false);

  if (error || !tile) {
    return null;
  }

  const { pixels } = tile;

  return (
    <button
      onClick={() =>
        updatePixel({
          sortedPixels: pixels.flat(),
          selectedColor,
          pixelId: pixel.id,
        })
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`flex flex-col hover:z-10 h-8 w-8 sm:h-16 sm:w-16 hover:opacity-50 hover:outline-dashed ${
        isPending && "cursor-wait hover:opacity-100 hover:outline-none"
      }
      ${isPending && "animate-spin opacity-50"}
      `}
      style={{
        background:
          isHovered && !isPending
            ? colorToCss(selectedColor)
            : colorToCss(pixel.color),
      }}
    />
  );
};

const ColorButtons = () => {
  const selectedColor = useGridState((state) => state.selectedColor);
  const setSelectedColor = useGridState((state) => state.setSelectedColor);

  const borderColor = selectedColor === "B" ? "green" : "black";

  return (
    <div className="grid grid-cols-5 lg:grid-cols-10 w-full py-4 gap-2 lg:gap-4">
      {colorValues.map((color) => (
        <div key={color} className="flex flex-col items-center">
          <Button
            size="icon"
            style={{
              background: colorToCss(color),
              border:
                selectedColor === color ? `4px solid ${borderColor}` : "none",
            }}
            onClick={() => setSelectedColor(color)}
          />
        </div>
      ))}
    </div>
  );
};
