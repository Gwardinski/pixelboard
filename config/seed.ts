import { Color } from "./types";

export function create16By16GridForTiles() {
  const grid = [];
  for (let i = 0; i < 16; i++) {
    for (let j = 0; j < 16; j++) {
      grid.push({
        id: i * 16 + (j + 1),
        pos: i * 16 + (j + 1),
        colors: getInitialTileColors(),
      });
    }
  }
  return grid;
}

function getInitialTileColors(): string {
  let i = 256;
  const s: Color[] = [];
  while (i > 0) {
    i = i - 1;
    s.push("W");
  }
  return s.join("-");
}
