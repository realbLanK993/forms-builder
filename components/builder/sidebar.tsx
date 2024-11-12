import { ChevronDown, ChevronUp, PlusCircleIcon } from "lucide-react";
import { Card } from "../ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useFormData } from "@/context/formdata";
import { DataType } from "@/lib/types/formdata";

const generateName = (type: string) =>
  `${type}_${crypto.randomUUID().split("-")[0]}`;

export default function BuilderSidebar({ uuid }: { uuid: string }) {
  const { formData, setFormData } = useFormData();
  const firstValue = formData.findIndex((item) => item.uuid === uuid) == 0;
  const lastValue = formData.findIndex((item) => item.uuid === uuid) == 
    formData.length - 1;
  const currentIndex = formData.findIndex((item) => item.uuid === uuid);
  return (
    <Card className="h-full w-[40px] flex flex-col rounded sidebar-card invisible opacity-0">
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger
            onClick={() => {
              const initialData: DataType = {
                uuid: crypto.randomUUID(),
                name: generateName( formData[currentIndex].type),
                label: "Username",
                type: "text",
                placeholder: "",
                required: true,
              };
              const index = formData.findIndex((item) => item.uuid === uuid);
              const newData = formData.toSpliced(index + 1, 0, initialData);
              setFormData(newData);
            }}
            className="hover:bg-secondary p-1 cursor-pointer flex justify-center items-center min-h-[40px]"
          >
            <PlusCircleIcon size={20} />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Add Question</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger
            disabled={firstValue}
            onClick={() => {
              setFormData((prev) => {
                const index = prev.findIndex((item) => item.uuid === uuid);
                if (index == 0) return [...prev];
                const temp = prev[index];
                prev[index] = prev[index - 1];
                prev[index - 1] = temp;
                return [...prev];
              });
            }}
            className={`hover:bg-secondary p-1 cursor-pointer flex justify-center items-center min-h-[40px] ${
              firstValue ? "pointer-events-none text-gray-400" : ""}`}
          >
            <ChevronUp size={20} />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Move Up</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <TooltipProvider>
        <Tooltip delayDuration={0}>
          <TooltipTrigger
            disabled={lastValue}
            onClick={() => {
              setFormData((prev) => {
                const index = prev.findIndex((item) => item.uuid === uuid);
                if (index == prev.length - 1) return [...prev];
                const temp = prev[index];
                prev[index] = prev[index + 1];
                prev[index + 1] = temp;
                return [...prev];
              });
            }}
            className={`hover:bg-secondary p-1 cursor-pointer flex justify-center items-center min-h-[40px] ${
              lastValue ? "pointer-events-none text-gray-400" : ""
            }`}
          >
            <ChevronDown size={20} />
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>Move Down</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </Card>
  );
}
