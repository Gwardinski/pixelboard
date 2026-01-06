"use client";

import { H2, H2Description, P } from "@/components/ui/typography";
import { TileBlock } from "@/config/types";
import { colorToCss } from "@/config/formatters";
import { useGrid } from "@/config/query-hooks";
import Link from "next/link";

export default function Page() {
  const { data: tiles = [], error } = useGrid();

  console.log("Grid data:", tiles);

  if (error) {
    return (
      <section className="flex flex-col items-center w-fit max-w-6xl overflow-hidden">
        <header className="flex flex-col items-start justify-center py-4 w-full text-left px-2">
          <p className="text-red-500">Error loading grid: {error.message}</p>
        </header>
      </section>
    );
  }

  if (!tiles) {
    return null;
  }

  return (
    <section className="flex flex-col items-center w-fit max-w-6xl overflow-hidden p-8">
      <header className="flex flex-col items-start justify-center py-4 w-full text-left px-2">
        <H2 className="text-2xl font-bold">Board Overview</H2>
        <H2Description>Select a Tile</H2Description>
      </header>

      <div className="no-scrollbar flex flex-col max-w-5xl w-screen px-2 lg:px-0 items-start lg:items-center overflow-auto px">
        {tiles.map((tiles, i) => (
          <div key={`tile-row-${i}`} className="flex overflow-hidden">
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
    <Link
      href={`tile/${tile.id}`}
      className="flex flex-col hover:z-10 h-16 w-16 hover:outline-dashed hover:opacity-50"
    >
      {tile.colors.map((row, i) => (
        <div key={i} className="flex">
          {row.map((col, j) => (
            <div
              key={j}
              className="flex h-1 w-1"
              style={{ background: colorToCss(col) }}
            />
          ))}
        </div>
      ))}
    </Link>
  );
};
