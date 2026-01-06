"use client";

import { Color, PixelBlock, TileBlock } from "@/config/types";
import {
  createPixelsFromTileColors,
  sortGrid,
  splitTileColorsIntoRows,
} from "@/config/formatters";
import { Tile } from "@/db/schema";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface GridResponse {
  tiles: {
    id: number;
    pos: number;
    colors: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  }[];
}

interface TileResponse {
  tile: {
    id: number;
    pos: number;
    colors: string;
    createdAt: Date | null;
    updatedAt: Date | null;
  };
}

export function useGrid() {
  return useQuery({
    queryKey: ["grid"],
    queryFn: async () => {
      const response = await fetch("/api/grid", { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch grid");
      }
      const data: GridResponse = await response.json();

      const convertedTiles = data.tiles?.map((t: Tile) => {
        return {
          ...t,
          colors: splitTileColorsIntoRows(t.colors.split("-") as Color[]),
        };
      });

      const sortedTiles = sortGrid<TileBlock>(convertedTiles ?? []);

      return sortedTiles;
    },
  });
}

export function useTile(tileId: string) {
  return useQuery({
    queryKey: ["tile", tileId],
    queryFn: async () => {
      const response = await fetch(`/api/tiles/${tileId}`, { method: "GET" });
      if (!response.ok) {
        throw new Error("Failed to fetch tile");
      }
      const data: TileResponse = await response.json();

      const sortedPixels = sortGrid<PixelBlock>(
        createPixelsFromTileColors(data?.tile?.colors.split("-") as Color[])
      );

      return {
        tile: data.tile,
        pixels: sortedPixels,
      };
    },
    enabled: !!tileId,
  });
}

export function useUpdatePixel(tileId: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      sortedPixels,
      selectedColor,
      pixelId,
    }: {
      sortedPixels: PixelBlock[];
      selectedColor: Color;
      pixelId: number;
    }) => {
      const newTileColors = sortedPixels
        .flat()
        .map((pixel) => (pixel.id === pixelId ? selectedColor : pixel.color))
        .join("-");

      const response = await fetch(`/api/tiles/${tileId}`, {
        method: "PUT",
        body: JSON.stringify({ colors: newTileColors }),
      });

      if (!response.ok) {
        throw new Error("Failed to update pixel");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grid"] });
      queryClient.invalidateQueries({ queryKey: ["tile", tileId] });
    },
  });
}

export function useResetGrid() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/reset", { method: "POST" });
      if (!response.ok) {
        throw new Error("Failed to reset grid");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["grid"] });
    },
  });
}
