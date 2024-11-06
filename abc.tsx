// Add use client here if you are using Next.js
//"use client"
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

import { Checkbox } from "@/components/ui/checkbox";

import { Label } from "@/components/ui/label";
type FormSchema = {
  username: string[];
};

export default function FormComponent() {
  const [data, setData] = useState<FormSchema>({
    username: [],
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log(data);
    const requiredFields: Record<keyof FormSchema, boolean> = {
      username: true,
    };
    const hasRequiredFields = (
      Object.keys(data) as Array<keyof FormSchema>
    ).every((key) => {
      if (requiredFields[key]) {
        const value = data[key];
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== "";
      }
      return true;
    });

    if (!hasRequiredFields) {
      toast({ description: "Please fill in all required fields" });
      e.preventDefault(); //Comment this line if you dont want to prevent default
      return;
    }
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
    e.preventDefault(); //Comment this line if you dont want to prevent default
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <Label htmlFor="username">
          Checking <span className="text-red-500">*</span>{" "}
        </Label>

        <div className="flex items-center gap-2">
          <Checkbox
            onChange={() => {
              setData((data) => {
                const newValue = data.username;
                newValue.includes("yes")
                  ? newValue.filter((value) => value !== "yes")
                  : [...newValue, "yes"];

                return {
                  ...data,
                  username: [...newValue],
                };
              });
            }}
            checked={data.username.includes("Yes")}
            id="yes"
            value="yes"
            className="border"
          />
          <Label htmlFor="yes">Yes</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            onChange={() => {
              setData((data) => {
                const newValue = data.username;
                newValue.includes("no")
                  ? newValue.filter((value) => value !== "no")
                  : [...newValue, "no"];

                return {
                  ...data,
                  username: [...newValue],
                };
              });
            }}
            checked={data.username.includes("No")}
            id="no"
            value="no"
            className="border"
          />
          <Label htmlFor="no">No</Label>
        </div>

        <div className="flex items-center gap-2">
          <Checkbox
            onChange={() => {
              setData((data) => {
                const newValue = data.username;
                newValue.includes("maybe")
                  ? newValue.filter((value) => value !== "maybe")
                  : [...newValue, "maybe"];

                return {
                  ...data,
                  username: [...newValue],
                };
              });
            }}
            checked={data.username.includes("Maybe")}
            id="maybe"
            value="maybe"
            className="border"
          />
          <Label htmlFor="maybe">Maybe</Label>
        </div>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
