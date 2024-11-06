// Add use client here if you are using Next.js
//"use client"
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";

import { Label } from "@/components/ui/label";
type FormSchema = {
  username: string;
  email: string;
  password: string;
  gender: string;
};

export default function FormComponent() {
  const [data, setData] = useState<FormSchema>({
    username: "",
    email: "",
    password: "",
    gender: "",
  });

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    console.log(data);
    const requiredFields: Record<keyof FormSchema, boolean> = {
      username: true,
      email: true,
      password: true,
      gender: false,
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
          Username <span className="text-red-500">*</span>{" "}
        </Label>
        <Input
          onChange={(e) => {
            setData((data) => {
              return {
                ...data,
                username: e.target.value,
              };
            });
          }}
          value={data.username}
          id="username"
          placeholder="Enter your username"
          type="text"
          className="border"
        />
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">
          Email <span className="text-red-500">*</span>{" "}
        </Label>
        <Input
          onChange={(e) => {
            setData((data) => {
              return {
                ...data,
                email: e.target.value,
              };
            });
          }}
          value={data.email}
          id="email"
          placeholder="Enter your email"
          type="email"
          className="border"
        />
        <p className="text-sm text-muted-foreground">Provide an unique email</p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="password">
          Password <span className="text-red-500">*</span>{" "}
        </Label>
        <Input
          onChange={(e) => {
            setData((data) => {
              return {
                ...data,
                password: e.target.value,
              };
            });
          }}
          value={data.password}
          id="password"
          placeholder="Enter your password"
          type="password"
          className="border"
        />
        <p className="text-sm text-muted-foreground">
          Password should be more than 8 characters
        </p>
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="gender">Gender</Label>
        <Select
          onValueChange={(value) =>
            setData((data) => ({ ...data, gender: value }))
          }
          value={data.gender}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select your gender" />
          </SelectTrigger>
          <SelectContent id="gender">
            <SelectItem value="male">Male</SelectItem>

            <SelectItem value="female">Female</SelectItem>

            <SelectItem value="other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Button type="submit">Submit</Button>
    </form>
  );
}
