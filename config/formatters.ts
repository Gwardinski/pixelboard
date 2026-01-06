import { Color, PixelBlock, TileBlock } from "./types";

export function sortGrid<T extends TileBlock | PixelBlock>(items: T[]): T[][] {
  const rows: T[][] = [];
  for (let i = 0; i < items.length; i += 16) {
    const row = items.slice(i, i + 16);
    rows.push(row);
  }
  return rows;
}

export function splitTileColorsIntoRows(input: Color[]): Color[][] {
  const rows: Color[][] = [];
  for (let i = 0; i < input.length; i += 16) {
    const row = input.slice(i, i + 16);
    rows.push(row);
  }
  return rows;
}

export function createPixelsFromTileColors(colors?: Color[]) {
  if (!colors) return [];

  const grid: PixelBlock[] = [];
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      const v = i * 16 + j;
      grid.push({
        id: v + 1,
        pos: i + 1,
        color: colors[v],
      });
    }
  }

  return grid;
}

export function colorToCss(color: string) {
  switch (color) {
    case "B":
      return "black";
    case "C":
      return "cyan";
    case "D":
      return "dodgerblue";
    case "G":
      return "green";
    case "O":
      return "orange";
    case "P":
      return "purple";
    case "R":
      return "red";
    case "H":
      return "hotpink";
    case "Y":
      return "yellow";
    case "W":
      return "white";
    default:
      return "gray";
  }
}
