"use client";

import { useEffect, useState } from "react";
import InputCard from "../inputs";
import { useFormData } from "@/context/formdata";


export default function Builder() {
  const { formData } = useFormData();
  const [data, setData] = useState(formData);

  useEffect(() => {
    setData(formData);
  }, [formData]);
  return (
    <div className="flex flex-col gap-4 h-full">
      
      {data.map((item, index) => {
        const focus = index == 0 ? true : false;
        return (
          <InputCard key={item.uuid} currentItem={item} firstValue={focus} />
        );
      })}
    </div>
  );
}
