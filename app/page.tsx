"use client";

import { H2, H2Description, P } from "@/components/ui/typography";
import { TileBlock } from "@/config/types";
import { useGrid } from "@/config/query-hooks";
import Link from "next/link";
import { ScalableTile, ScaleablePixel } from "@/components/Scalable";

export default function Page() {
  const { data: tiles = [] } = useGrid();

  if (!tiles) {
    return null;
  }

  return (
    <section className="flex flex-col items-center py-8 px-4 gap-4 max-w-6xl">
      <header className="flex flex-col py-4 w-full text-left px-5 glass dark:dark-glass rounded-lg">
        <H2 className="text-2xl font-bold">Board Overview</H2>
        <H2Description>Select a Tile</H2Description>
      </header>

      <div className="no-scrollbar flex flex-col items-center max-w-5xl w-screen overflow-auto">
        {tiles.map((tiles, i) => (
          <div key={`tile-row-${i}`} className="flex">
            {tiles.map((tile) => (
              <TileItem key={tile.id} tile={tile} />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

const TileItem: React.FC<{ tile: TileBlock }> = ({ tile }) => {
  return (
    <ScalableTile>
      <Link
        href={`tile/${tile.id}`}
        className="flex flex-col hover:z-10 hover:outline-dashed hover:opacity-50"
      >
        {tile.colors.map((row, i) => (
          <span key={i} className="flex">
            {row.map((color, j) => (
              <ScaleablePixel key={j} color={color} />
            ))}
          </span>
        ))}
      </Link>
    </ScalableTile>
  );
};
