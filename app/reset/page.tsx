"use client";

import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";
import { Input } from "@/components/ui/input";
import { useResetGrid } from "@/config/query-hooks";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function ResetPage() {
  const { mutate: resetGrid } = useResetGrid();
  const router = useRouter();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.target as HTMLFormElement);
    const code = formData.get("code") as string;
    resetGrid(code);
    router.push("/");
  }

  return (
    <section className="flex flex-col items-center py-8 px-4 gap-4 max-w-6xl">
      <form onSubmit={handleSubmit} className="mt-8 lg:mt-32">
        <Card className="glass dark:dark-glass">
          <CardHeader>
            <CardTitle>Reset</CardTitle>
            <CardDescription>
              Reset the grid to the original state
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              name="code"
              type="text"
              placeholder="Code..."
              className="w-full"
            />
            <Button type="submit">Reset</Button>
          </CardContent>
        </Card>
      </form>
    </section>
  );
}
