"use client";

import { colorValues } from "@/config/types";
import { colorToCss } from "@/config/formatters";
import { useGrid } from "@/config/query-hooks";

export const Border: React.FC = () => {
  const { isPending } = useGrid();

  return (
    <div className="flex">
      {[
        ...colorValues,
        ...colorValues,
        ...colorValues,
        ...colorValues,
        ...colorValues,
        ...colorValues,
        ...colorValues,
        ...colorValues,
        ...colorValues,
      ].map((color, i) => (
        <div
          key={`${color}-${i}`}
          className={`flex h-1 w-1 ${isPending && "animate-spin"}`}
          style={{ background: colorToCss(color) }}
        />
      ))}
    </div>
  );
};
