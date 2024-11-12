import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-1 w-full h-full p-4">
      <div className="flex flex-col gap-4 flex-1 w-full min-h-[400px] h-full text-center justify-center items-center">
        <p className="font-bold tracking-tighter leading-normal text-4xl max-w-[600px] gap-2">
          Effortlessly Generate Custom Form Code for React
        </p>
        <div className="flex gap-4">
          <Link target="_blank" href={"https://github.com/realbLanK993/forms-builder"}>
            <Button variant={"outline"}>Github</Button>
          </Link>
          <Link href={"/playground"}>
            <Button variant={"outline"}>Playground</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
