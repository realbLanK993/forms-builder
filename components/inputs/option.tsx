"use client";

import { OptionType } from "@/lib/types/formdata";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useState } from "react";
import { Trash } from "lucide-react";

export function Option({
  currentOption,
  deleteFn,
}: // change,
{
  currentOption: OptionType;
  deleteFn: (uuid: string) => void;
  change: (label: string, uuid: string) => void;
}) {
  const [option, setOption] = useState(currentOption);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOption({
      ...option,
      label: e.target.value,
    });
    // change(e.target.value, option.uuid);
  };

  return (
    <div className="flex gap-2 w-full">
      <Input onChange={onChange} value={option.label} />
      <Button onClick={() => deleteFn(option.uuid)} variant="outline">
        <Trash className="text-red-500" size={16} />
      </Button>
    </div>
  );
}
