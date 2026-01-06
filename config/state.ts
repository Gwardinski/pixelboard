"use client";

import { create } from "zustand";
import { Color } from "./types";

interface GridState {
  selectedColor: Color;
  setSelectedColor: (color: Color) => void;
}

export const useGridState = create<GridState>((set) => ({
  selectedColor: "B",
  setSelectedColor: (color) => set(() => ({ selectedColor: color })),
}));
