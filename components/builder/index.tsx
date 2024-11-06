"use client";

import { useEffect, useState } from "react";
import InputCard from "../inputs";
import { useFormData } from "@/context/formdata";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";

export default function Builder() {
  const { formData } = useFormData();
  const [data, setData] = useState(formData);

  useEffect(() => {
    setData(formData);
  }, [formData]);
  return (
    <div className="flex flex-col gap-4 h-full">
      <Card className="gap-4 flex flex-col p-4">
        <p className="font-bold">Tech Stack</p>
        <div className="flex flex-row flex-wrap gap-4">
          <div className="flex gap-2 items-center">
            <Checkbox id="react" defaultChecked />{" "}
            <Label htmlFor="react">React</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="typescript" defaultChecked />{" "}
            <Label htmlFor="typescript">Typescript</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="css" defaultChecked />{" "}
            <Label htmlFor="css">CSS</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="tailwind" defaultChecked />{" "}
            <Label htmlFor="tailwind">TailwindCSS</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="shadcn" defaultChecked />{" "}
            <Label htmlFor="shadcn">shadCN</Label>
          </div>
          <div className="flex gap-2 items-center">
            <Checkbox id="react" defaultChecked />{" "}
            <Label htmlFor="react">React Hook Form</Label>
          </div>
        </div>
      </Card>
      {data.map((item, index) => {
        const focus = index == 0 ? true : false;
        return (
          <InputCard key={item.uuid} currentItem={item} firstValue={focus} />
        );
      })}
    </div>
  );
}
