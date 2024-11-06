import {
  DataType,
  options,
  OptionType,
  AnswerTypes,
} from "@/lib/types/formdata";
import { useEffect, useMemo, useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CapitalizeFirstLetter } from "@/lib/utils";
import BuilderSidebar from "../builder/sidebar";
import { Check, Copy, EllipsisVertical, Trash } from "lucide-react";
import { Switch } from "../ui/switch";
import InputOptions from "./options";
import { useFormData } from "@/context/formdata";

export default function InputCard({
  currentItem,
  firstValue,
}: {
  currentItem: DataType;
  firstValue: boolean;
}) {
  const [selected, setSelected] = useState<AnswerTypes>(currentItem.type);
  const { setFormData } = useFormData();
  const [focus, setFocus] = useState(firstValue);
  const [description, setDescription] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClickOrKey);
    document.addEventListener("keydown", handleOutsideClickOrKey);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClickOrKey);
      document.removeEventListener("keydown", handleOutsideClickOrKey);
    };
  }, []);
  const handleOutsideClickOrKey = (e: MouseEvent | KeyboardEvent) => {
    if (e instanceof MouseEvent) {
      if (
        e.target &&
        elementRef.current &&
        !elementRef.current.contains(e.target as Node)
      ) {
        setFocus(false);
      } else {
        setFocus(true);
      }
    } else if (e instanceof KeyboardEvent && e.key === "Tab") {
      if (
        document.activeElement &&
        elementRef.current &&
        !elementRef.current.contains(document.activeElement)
      ) {
        setFocus(false);
      } else {
        setFocus(true);
      }
    }
  };
  const onNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            name: e.target.value,
          };
        }
        return input;
      });
    });
  };

  const onLabelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            label: e.target.value,
          };
        }
        return input;
      });
    });
  };
  const onPlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            placeholder: e.target.value,
          };
        }
        return input;
      });
    });
  };

  const onRequiredChange = (e: boolean) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            required: e,
          };
        }
        return input;
      });
    });
  };

  const onDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => {
      return prev.map((input) => {
        if (input.uuid === currentItem.uuid) {
          return {
            ...input,
            description: e.target.value,
          };
        }
        return input;
      });
    });
  };

  const onDuplicate = () => {
    const newItem = JSON.parse(
      JSON.stringify({ ...currentItem, uuid: Date.now().toString() })
    );
    setFormData((prev) => {
      return [...prev, newItem];
    });
  };
  const onDelete = () => {
    setFormData((prev) => {
      return prev.filter((it) => it.uuid !== currentItem.uuid);
    });
  };
  useEffect(() => {
    setFormData((prev) => {
      return prev.map((item) => {
        if (currentItem.uuid === item.uuid) {
          return { ...currentItem, type: selected };
        }
        return item;
      });
    });
  }, [selected]);
  const availableOptionTypes: () => AnswerTypes[] = useMemo(
    () => () => options,
    []
  );
  const initialCheckboxOptions: () => OptionType[] = useMemo(
    () => () => {
      if (currentItem.options) return currentItem.options;
      const uuid = crypto.randomUUID();
      return [{ label: "Option 1", value:"option1", checked: false, uuid }];
    },
    [currentItem]
  );
  const initialRadioOptions: () => OptionType[] = useMemo(
    () => () => {
      if (currentItem.options) return currentItem.options;
      const uuid = crypto.randomUUID();
      return [{ label: "Option 1", value: "option1", uuid }];
    },
    [currentItem]
  );
  return (
    <div
      data-focus={focus}
      ref={elementRef}
      className="flex gap-2 w-full parent"
    >
      <Card
        className="w-full h-full min-h-[200px] flex flex-col gap-4 justify-between p-4 input-card
      relative"
      >
        <div className="h-full w-[6px] bg-primary dark:bg-muted invisible absolute rounded-l-3xl focus-bar left-0 top-0" />
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-bold">Label </p>
            <Input
              onChange={onLabelChange}
              defaultValue={currentItem.label}
              required={currentItem.required}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-bold">Type</p>
            <Select
              onValueChange={(e) => setSelected(e as AnswerTypes)}
              value={selected}
            >
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Input Type" />
              </SelectTrigger>
              <SelectContent>
                {availableOptionTypes().map((option) => (
                  <SelectItem key={option} value={option}>
                    {CapitalizeFirstLetter(option)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        {description && (
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-bold">Description</p>
            <Input
              onChange={onDescriptionChange}
              defaultValue={currentItem.description}
              type="text"
            />
          </div>
        )}
        <div className="flex gap-2">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-bold">Name</p>
            <Input
              onChange={onNameChange}
              defaultValue={currentItem.name}
              required={currentItem.required}
              type="text"
            />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <p className="text-sm font-bold">Placeholder</p>
            <Input
              onChange={onPlaceholderChange}
              defaultValue={currentItem.placeholder}
              required={currentItem.required}
              type="text"
            />
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {(currentItem.type == "checkbox" || currentItem.type == "radio") && (
            <p className="text-sm font-bold">Options</p>
          )}
          {currentItem.type == "checkbox" && (
            <InputOptions
              uuid={currentItem.uuid}
              options={initialCheckboxOptions()}
            />
          )}
          {currentItem.type == "radio" && (
            <InputOptions
              uuid={currentItem.uuid}
              options={initialRadioOptions()}
            />
          )}
          {currentItem.type == "dropdown" && (
            <InputOptions
              uuid={currentItem.uuid}
              options={initialRadioOptions()}
            />
          )}
        </div>
        <div className="flex gap-8 w-full justify-end">
          <div className="flex gap-8">
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger onClick={onDuplicate}>
                  <Copy size={16} />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Duplicate</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip delayDuration={0}>
                <TooltipTrigger disabled={firstValue} onClick={onDelete}>
                  <Trash
                    className={firstValue ? "text-gray-400" : ""}
                    size={16}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="border-r border-2 border-gray-300" />
          <div className="flex items-center font-bold gap-2">
            <Switch
              defaultChecked={currentItem.required}
              onCheckedChange={onRequiredChange}
            />
            <p className="text-xs">REQUIRED</p>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <EllipsisVertical size={20} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[180px]">
                <DropdownMenuItem
                  onClick={() => setDescription(!description)}
                  className="flex justify-between items-center"
                >
                  Description {description && <Check size={16} />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </Card>
      <BuilderSidebar uuid={currentItem.uuid} />
    </div>
  );
}
