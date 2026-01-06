"use client";

import { Button } from "@/components/ui";
import { useGridState } from "@/config/state";
import { colorValues, PixelBlock } from "@/config/types";
import { colorToCss } from "@/config/formatters";
import { useTile, useUpdatePixel } from "@/config/query-hooks";
import Link from "next/link";
import { use, useState } from "react";
import { H2, H2Description } from "@/components/ui/typography";
import { ScalableTile } from "@/components/Scalable";

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
    <section className="flex flex-col items-center py-8 px-4 gap-4 max-w-6xl">
      <header className="flex py-4 w-full items-center text-left px-5 glass dark:dark-glass rounded-lg">
        <div className="flex flex-col">
          <H2 className="text-2xl font-bold">Tile {tile?.id}</H2>
          <H2Description>
            Select a Color, then click a pixel to fill it in
          </H2Description>
        </div>
        <Link href={"/"} className="ml-auto">
          <Button variant="default">Back</Button>
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
    <div className="no-scrollbar flex flex-col max-w-5xl px-2 w-screen items-center overflow-auto">
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

  function handleClick() {
    if (!tile || isPending) return;
    updatePixel({
      sortedPixels: tile.pixels.flat(),
      selectedColor,
      pixelId: pixel.id,
    });
  }

  return (
    <ScalableTile>
      <button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`flex flex-col hover:z-10 w-full h-full hover:opacity-50 hover:outline-dashed ${
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
    </ScalableTile>
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
