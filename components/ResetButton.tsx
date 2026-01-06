"use client";

import { useResetGrid } from "@/config/query-hooks";
import { Button } from "./ui";

export function ResetButton() {
  const { mutate: resetGrid } = useResetGrid();
  return <Button onClick={() => resetGrid()}>Reset</Button>;
}
