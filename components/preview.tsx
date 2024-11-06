"use client"

import { useFormData } from "@/context/formdata"
import { Label } from "./ui/label"
import { Input } from "./ui/input"
import { DataType } from "@/lib/types/formdata"
import { Checkbox } from "./ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"



const renderInput = (item: DataType) => {
    return (
      <div className="flex flex-col gap-2">
          <Label htmlFor={item.name}>
            {item.label}{" "}
            {item.required && <span className="text-red-500">*</span>}
          </Label>
        <Input placeholder={item.placeholder} type={item.type} id={item.name} />
        <span className="text-xs text-muted-foreground">
          {item.description}
        </span>
      </div>
    );
}

const renderTextarea = (item: DataType) => {
    return (
      <div className="flex flex-col gap-2">
        <Label htmlFor={item.name}>
          {item.label}{" "}
          {item.required && <span className="text-red-500">*</span>}
        </Label>
        <Textarea placeholder={item.placeholder} id={item.name} />
        <span className="text-xs text-muted-foreground">
          {item.description}
        </span>
      </div>
    );
}

const renderCheckbox = (item: DataType) => {
    return (
      <div className="flex flex-col gap-2">
        {item.label !== "" && (
          <div className="flex flex-col gap-1">
            <Label htmlFor={item.name}>
              {item.label}{" "}
              {item.required && <span className="text-red-500">*</span>}
            </Label>
            <span className="text-xs text-muted-foreground">{item.description}</span>
          </div>
        )}
        {item.options?.map((option, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <Checkbox id={option.label} />
              <Label htmlFor={option.label}>{option.label}</Label>
            </div>
          );
        })}
      </div>
    );
}

const renderDropdown = (item: DataType) => {
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
        <Select name={item.name}>
          <SelectTrigger>
            <SelectValue placeholder={item.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {item.options?.map((option, index) => {
              return (
                <SelectItem key={index} value={option.label}>
                  {option.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>
    );
}

const renderRadio = (item: DataType) => {
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
        {item.options?.map((option, index) => {
          return (
            <div key={index} className="flex items-center gap-2">
              <Checkbox id={option.label} />
              <Label htmlFor={option.label}>{option.label}</Label>
            </div>
          );
        })}
      </div>
    );
}



export default function Preview(){
    const {formData} = useFormData()
    return (<div className="flex flex-col gap-4 px-2">
        {
            formData.map((item) => {
                switch (item.type) {
                    case "checkbox":
                        return renderCheckbox(item)
                    case "dropdown":
                        return renderDropdown(item)
                    case "radio":
                        return renderRadio(item)
                    case "textarea":
                        return renderTextarea(item)
                    default:
                        return renderInput(item)
                }
            })
        }
        <Button>Submit</Button>
    </div>)
}