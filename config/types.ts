// Application Tile type (with parsed colors as 2D array)
// Database Tile type is imported from db/schema.ts
export type TileBlock = {
  id: number;
  pos: number;
  colors: Color[][];
};

export type PixelBlock = {
  id: number;
  pos: number;
  color: Color;
};

export const colorValues = [
  "W",
  "B",
  "D",
  "C",
  "G",
  "P",
  "R",
  "H",
  "Y",
  "O",
] as const;

export type Color = (typeof colorValues)[number];
