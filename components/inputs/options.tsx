"use client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { OptionType } from "@/lib/types/formdata";
import { useFormData } from "@/context/formdata";
import { Input } from "../ui/input";
import { Trash } from "lucide-react";
export default function InputOptions({
  options,
  uuid,
}: {
  options: OptionType[];
  uuid: string;
}) {
  const [optionValue, setOptionValue] = useState(options);
  const { setFormData } = useFormData();
  useEffect(() => {
    setFormData((prev) => {
      return prev.map((item) => {
        if (item.uuid === uuid) {
          return {
            ...item,
            options: [...optionValue],
          };
        }
        return item;
      });
    });
  }, [optionValue]);
  const addOption = () => {
    const uuidv4 = crypto.randomUUID();
    setOptionValue((prev) => [
      ...prev,
      { uuid: uuidv4, label: `Option ${optionValue.length + 1}` },
    ]);
  };
  const deleteOption = (uuid: string) => {
    setOptionValue((prev) => prev.filter((option) => uuid !== option.uuid));
  };

  const onChange = (label: string, uuid: string) => {
    setOptionValue((prev) => {
      return prev.map((option) => {
        if (uuid == option.uuid) {
          return {
            ...option,
            label,
          };
        }
        return option;
      });
    });
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      {optionValue.map((option, index) => {
        const firstValue = index == 0 ? true : false;
        return (
          <div key={option.uuid} className="flex gap-2 w-full">
            <Input
              onChange={(e) => onChange(e.target.value, option.uuid)}
              defaultValue={option.label}
            />
            <Button
              disabled={firstValue}
              onClick={() => deleteOption(option.uuid)}
              variant="outline"
            >
              <Trash className="text-red-500" size={16} />
            </Button>
          </div>
        );
      })}
      <Button onClick={addOption} variant="outline">
        Add Option
      </Button>
    </div>
  );
}
