"use client";
import { DataType } from "@/lib/types/formdata";
import { createContext, useContext, useState } from "react";

const initialData: DataType = {
  uuid: crypto.randomUUID(),
  name: "text_" + crypto.randomUUID().split("-")[0],
  label: "Username",
  type: "text",
  placeholder: "",
  required: true,
};
interface FormDataContextType {
  formData: DataType[];
  setFormData: React.Dispatch<React.SetStateAction<DataType[]>>;
}

export const FormDataContext = createContext<FormDataContextType | undefined>(
  undefined
);

export const FormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState([initialData]);
  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
      {children}
    </FormDataContext.Provider>
  );
};

export const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context) {
    throw new Error("useFormData must be used within a FormProvider");
  }
  return context;
};
