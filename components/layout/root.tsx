import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function RootNavbar() {
  return (
    <div className="flex flex-row justify-between items-center p-4">
      <Link href="/">
        <h1 className="text-xl font-bold">Form Builder</h1>
      </Link>
      <Link href="/playground">
        <Button variant={"outline"}>Playground</Button>
      </Link>
    </div>
  );
}
