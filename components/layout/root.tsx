import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ThemeToggle } from "../theme-toggle";

export default function RootNavbar() {
  return (
    <div className="flex flex-row justify-between items-center p-4">
      <Link href="/">
        <h1 className="text-xl font-bold">Form Builder</h1>
      </Link>
      <div className="flex gap-2">
        <ThemeToggle />
        <Link href="/playground">
          <Button variant={"outline"}>Playground</Button>
        </Link>
      </div>
    </div>
  );
}
