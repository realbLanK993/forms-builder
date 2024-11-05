"use client";
import { FormProvider } from "@/context/formdata";
import { ToastProvider } from "./ui/toast";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <FormProvider>{children}</FormProvider>
    </ToastProvider>
  );
}
