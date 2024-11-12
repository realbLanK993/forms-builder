"use client";

import { useEffect, useMemo, useState } from "react";
import InputCard from "../inputs";
import { useFormData } from "@/context/formdata";
import { findDuplicateNames } from "@/lib/utils";




export default function Builder() {
  const { formData } = useFormData();
  const [data, setData] = useState(formData);
  const duplicateNames = useMemo(() => findDuplicateNames(formData), [formData]);

  useEffect(() => {
    setData(formData);
  }, [formData]);
  return (
    <div className="flex flex-col gap-4 h-full">
      {data.map((item, index) => {
        const focus = index == 0 ? true : false;

        return (
          <InputCard
            duplicate={duplicateNames.includes(item.name)}
            key={item.uuid}
            currentItem={item}
            firstValue={focus}
          />
        );
      })}
    </div>
  );
}
