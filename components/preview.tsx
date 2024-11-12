"use client";

import { useFormData } from "@/context/formdata";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { DataType } from "@/lib/types/formdata";
import { Checkbox } from "./ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useEffect, useMemo, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { findDuplicateNames } from "@/lib/utils";

const renderInput = (
  item: DataType,
  data: { [key: string]: string | string[] },
  setData: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | string[] }>
  >
) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={item.name}>
        {item.label} {item.required && <span className="text-red-500">*</span>}
      </Label>
      <Input
        onChange={(e) =>
          setData((data) => ({ ...data, [item.name]: e.target.value }))
        }
        value={data[item.name]}
        placeholder={item.placeholder}
        type={item.type}
        id={item.name}
      />
      <span className="text-xs text-muted-foreground">{item.description}</span>
    </div>
  );
};

const renderTextarea = (
  item: DataType,
  data: { [key: string]: string | string[] },
  setData: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | string[] }>
  >
) => {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={item.name}>
        {item.label} {item.required && <span className="text-red-500">*</span>}
      </Label>
      <Textarea
        onChange={(e) =>
          setData((data) => ({ ...data, [item.name]: e.target.value }))
        }
        value={data[item.name]}
        placeholder={item.placeholder}
        id={item.name}
      />
      <span className="text-xs text-muted-foreground">{item.description}</span>
    </div>
  );
};

const renderCheckbox = (
  item: DataType,
  data: { [key: string]: string | string[] },
  setData: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | string[] }>
  >
) => {
  const handleChange = (optionValue: string) => {
    setData((prevData) => {
      const currentValues = prevData[item.name] as string[] || [];
      const newValues = currentValues.includes(optionValue)
        ? currentValues.filter((value) => value !== optionValue)
        : [...currentValues, optionValue];

      return { ...prevData, [item.name]: newValues };
    });
  };
  return (
    <div className="flex flex-col gap-2">
      {item.label !== "" && (
        <div className="flex flex-col gap-1">
          <Label htmlFor={item.name}>
            {item.label}{" "}
            {item.required && <span className="text-red-500">*</span>}
          </Label>
          <span className="text-xs text-muted-foreground">
            {item.description}
          </span>
        </div>
      )}
      {item.options?.map((option) => (
        <div key={option.value} className="flex items-center gap-2">
          <Checkbox
            id={`${item.name}-${option.value}`}
            checked={(data[item.name] as string[] || []).includes(option.value)}
            onCheckedChange={() => handleChange(option.value)}
          />
          <Label htmlFor={`${item.name}-${option.value}`}>{option.label}</Label>
        </div>
      ))}
    </div>
  );
};

const renderDropdown = (
  item: DataType,
  data: { [key: string]: string | string[] },
  setData: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | string[] }>
  >
) => {
  return (
    <div className="flex flex-col gap-2 text-base">
      <div className="flex flex-col gap-1">
        <Label htmlFor={item.name}>
          {item.label}{" "}
          {item.required && <span className="text-red-500">*</span>}
        </Label>
        <span className="text-xs text-muted-foreground">
          {item.description}
        </span>
      </div>
      <Select
        value={data[item.name] as string}
        onValueChange={(value) =>
          setData((data) => ({ ...data, [item.name]: value }))
        }
        name={item.name}
      >
        <SelectTrigger>
          <SelectValue placeholder={item.placeholder} />
        </SelectTrigger>
        <SelectContent>
          {item.options?.map((option, index) => {
            return (
              <SelectItem key={index} value={option.value}>
                {option.label}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

const renderRadio = (
  item: DataType,
  data: { [key: string]: string | string[] },
  setData: React.Dispatch<
    React.SetStateAction<{ [key: string]: string | string[] }>
  >
) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <Label htmlFor={item.name}>
          {item.label}{" "}
          {item.required && <span className="text-red-500">*</span>}
        </Label>
        <span className="text-xs text-muted-foreground">
          {item.description}
        </span>
      </div>
      <RadioGroup
        value={data[item.name] as string}
        onValueChange={(value) =>
          setData((data) => ({ ...data, [item.name]: value }))
        }
      >
        {item.options?.map((option, index) => {
          return (
            <div key={index} className="flex items-center space-x-2">
              <RadioGroupItem
                id={option.value}
                value={option.value}
                defaultChecked={data[item.name] === option.value}
              />
              <Label htmlFor={option.value}>{option.label}</Label>
            </div>
          );
        })}
      </RadioGroup>
    </div>
  );
};

export default function Preview() {
  const { formData } = useFormData();
  const duplicateNames = useMemo(() => findDuplicateNames(formData), [formData]);
  const { toast } = useToast();
  const initialData: { [key: string]: string | string[] } = useMemo(() => {
    return formData.reduce((acc, item) => {
      acc[item.name] = item.type === "checkbox" ? [] : "";
      return acc;
    }, {} as { [key: string]: string | string[] });
  }, [formData]);
  const [data, setData] = useState(initialData);
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    if (formData.some((item) => item.required && !data[item.name])) {
      toast({ description: "Please fill in all the required fields" });
      e.preventDefault();
    }
    else {
      toast({
        title: "Form submitted",
        description: (
          <pre>
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      e.preventDefault();
    }
  };
  useEffect(() => {
    if (duplicateNames.length > 0) {
      toast({
        title: "Duplicate names found",
        description: (
          <pre>
            <code>{JSON.stringify(duplicateNames, null, 2)}</code>
          </pre>
        ),
      });
    }
  }, [duplicateNames]);
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 px-2">
      {data && formData.map((item) => {
        switch (item.type) {
          case "checkbox":
            return <div key={item.uuid}>{renderCheckbox(item, data, setData)}</div>
          case "dropdown":
            return <div key={item.uuid}>{renderDropdown(item, data, setData)}</div>;
          case "radio":
            return <div key={item.uuid}>{renderRadio(item, data, setData)}</div>;
          case "textarea":
            return <div key={item.uuid}>{renderTextarea(item, data, setData)}</div>;
          default:
            return <div key={item.uuid}>{renderInput(item, data, setData)}</div>;
        }
      })}
      <Button type="submit">Submit</Button>
    </form>
  );
}
