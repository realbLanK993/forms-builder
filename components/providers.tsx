"use client";
import { FormProvider } from "@/context/formdata";
import { ToastProvider } from "./ui/toast";
import { ThemeProvider } from "./theme-provider";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      <ToastProvider>
        <FormProvider>{children}</FormProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}
