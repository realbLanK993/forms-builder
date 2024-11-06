import { AnswerTypes, DataType } from "./types/formdata";

function convertString(str: string) {
  return str
    .split("")
    .map((char) => char.toLowerCase().replace(" ", "_"))
    .join("");
}

function generateShadcnInputCode({ item }: { item: DataType }) {
  return `
            <div className="flex flex-col gap-2">
              <Label htmlFor="${item.name}">${item.label}  ${
    item.required ? `<span className="text-red-500">*</span>` : ""
  } </Label>
              <Input
                onChange={(e) => {
                  setData((data) => {
                    return {
                      ...data,
                      ${item.name}: e.target.value,
                    };
                  })
                }}
                value={data.${item.name}}
                id="${item.name}"
                placeholder="${item.placeholder}"
                type="${item.type}"
                className="border"
              />
              ${
                item.description
                  ? `<p className="text-sm text-muted-foreground">${item.description}</p>`
                  : ``
              }
            </div>
  `;
}

function generateShadcnTextareaCode({ item }: { item: DataType }) {
  return `
            <div className="flex flex-col gap-2">
              <Label htmlFor="${item.name}">${item.label}  ${item.required ? `<span className="text-red-500">*</span>` : ""} </Label>
              <Textarea
                onChange={(e) => {
                  setData((data) => {
                    return {
                      ...data,
                      ${item.name}: e.target.value,
                    };
                  })
                }}
                value={data.${item.name}}
                id="${item.name}"
                placeholder="${item.placeholder}"
                className="border"
              />
              ${
                item.description
                  ? `<p className="text-sm text-muted-foreground">${item.description}</p>`
                  : ``
              }
            </div>
  `;
}

function generateShadcnCheckboxCode({ item }: { item: DataType }) {
  return `
            <div className="flex flex-col gap-2">
              <Label htmlFor="${item.name}">${item.label}  ${item.required ? `<span className="text-red-500">*</span>` : ""} </Label>
              ${item.options?.map((option) => {
                return `
                    <div className="flex items-center gap-2">
                      <Checkbox
                        onChange={() => {
                          setData((data) => {
                            const newValue = data.${item.name}
                            newValue.includes("${convertString(option.label)}")
                              ? newValue.filter((value) => value !== "${convertString(
                                option.label
                              )}")
                              : [...newValue, "${convertString(option.label)}"];

                            return {
                              ...data,
                              ${item.name}: [...newValue],
                            };
                          })
                        }}
                        checked={data.${item.name}.includes("${option.label}")}
                        id="${convertString(option.label)}"
                        value="${convertString(option.label)}"
                        className="border"
                      />
                      <Label htmlFor="${convertString(option.label)}">${
                  option.label
                }</Label>
                    </div>
                  `;
              }).join("")}
              ${
                item.description
                  ? `<p className="text-sm text-muted-foreground">${item.description}</p>`
                  : ``
              }
            </div>
  `;
}

const generateShadcnRadioCode = ({ item }: { item: DataType }) => {
  return `
            <div className="flex flex-col gap-2">
              <Label htmlFor="${item.name}">${item.label}</Label>
              <RadioGroup onValueChange={(value) => setData((data) => ({ ...data, ${item.name}: value }))} value={data.${item.name}}>
              ${item.options?.map((option) => {
                return `
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem id="${convertString(
                        option.label
                      )}" value="${convertString(option.label)}" />
                      <Label htmlFor="${convertString(
                        option.label
                      )}">Option One</Label>
                    </div>
                  `;
              }).join("")}
              </RadioGroup>
              ${
                item.description
                  ? `<p className="text-sm text-muted-foreground">${item.description}</p>`
                  : ``
              }
            </div>
  `;
};

const generateShadcnDropdownCode = ({ item }: { item: DataType }) => {
  return `
            <div className="flex flex-col gap-2">
              <Label htmlFor="${item.name}">${item.label}</Label>
              <Select
                
                onValueChange={(value) => setData((data) => ({ ...data, ${
                  item.name
                }: value }))}
                value={data.${item.name}}
              >
                <SelectTrigger>
                  <SelectValue placeholder="${item.placeholder}" />
                </SelectTrigger>
                <SelectContent id="${item.name}">
                  ${item.options?.map((option) => {
                    return `
                      <SelectItem value="${convertString(option.label)}">${
                      option.label
                    }</SelectItem>
                    `;
                  })}
                </SelectContent>
              </Select>
              ${
                item.description
                  ? `<p className="text-sm text-muted-foreground">${item.description}</p>`
                  : ``
              }
            </div>
  `;
}

function generateRhfCheckboxCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name="${item.name}"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>${item.label} ${item.required ? `<span className="text-red-500">*</span>` : ""} </FormLabel>
                    ${
                      item.description
                        ? `<FormDescription>${item.description}</FormDescription>`
                        : ``
                    }
                  </div>
                  {${item.name}_items.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="${item.name}"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 gap-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...field.value, item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="text-sm font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />
  `;
}
function generateRhfRadioCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name="${item.name}"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>${item.label}  ${
    item.required ? `<span className="text-red-500">*</span>` : ""
  } </FormLabel>
                  ${
                    item.description
                      ? `<FormDescription>${item.description}</FormDescription>`
                      : ``
                  }
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      ${item.options
                        ?.map((option) => {
                          return `
                        <FormItem className="flex items-center space-x-3 space-y-0  gap-2">
                          <FormControl>
                            <RadioGroupItem value="${convertString(
                              option.label
                            )}" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            ${option.label}
                          </FormLabel>
                        </FormItem> `;
                        })
                        .join("")}
                      
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />`;
}

function generateRhfDropdownCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name="${item.name}"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>${item.label}  ${
    item.required ? `<span className="text-red-500">*</span>` : ""
  } </FormLabel>
                  <Select defaultValue="${
                    item.options && convertString(item.options[0].label)
                  }"> 
                  </Select>
                  <Select name="${
                    item.name
                  }"  onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="${item.placeholder}" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      ${
                        item.options &&
                        item.options
                          .map((option) => {
                            return `
                        <SelectItem value="${convertString(option.label)}">${
                              option.label
                            }</SelectItem>`;
                          })
                          .join("")
                      }
                    </SelectContent>
                  </Select>
                  ${
                    item.description
                      ? `<FormDescription>${item.description}</FormDescription>`
                      : ``
                  }
                  <FormMessage />
                </FormItem>
              )}
            />
  `;
}

function generateRhfInputCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name="${item.name}"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>${item.label}  ${
    item.required ? `<span className="text-red-500">*</span>` : ""
  } </FormLabel>
                  <FormControl>
                    <Input type="${item.type}" placeholder="${
    item.placeholder
  }" {...field} />
                  </FormControl>
                  ${
                    item.description
                      ? `<FormDescription>${item.description}</FormDescription>`
                      : ``
                  }
                  <FormMessage />
                </FormItem>
              )}
            />
  `;
}

function generateRhfTextareaCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name=${item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>${item.label}  ${
    item.required ? `<span className="text-red-500">*</span>` : ""
  } </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder=${item.placeholder}
                      {...field}
                    />
                  </FormControl>
                  ${
                    item.description &&
                    `<FormDescription>{item.description}</FormDescription>`
                  }
                  <FormMessage />
                </FormItem>
              )}
            />
  `;
}

function generateRhfImports() {
  return `
import {
Form,
FormControl,
FormDescription,
FormField,
FormItem,
FormLabel,
FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form";
`;
}

function generateTypes(type: AnswerTypes) {
  switch (type) {
    case "checkbox":
      return "string[]";
    case "number":
      return "number";
    case "file":
      return "FileList";
    default:
      return "string";
  }
}

function generateCheckboxData(data: DataType[]) {
  return data
    .map((item) => {
      switch (item.type) {
        case "checkbox":
          const checkboxOptions = item.options
            ?.map(
              (option) =>
                `{ id: "${convertString(option.label)}", label: "${
                  option.label
                }" }`
            )
            .join(", ");
          return `const ${item.name}_items = [${checkboxOptions}];`;
        default:
          return "";
      }
    })
    .join("\n");
}

function generateShadcnImports({ data,shadcn }: { data: DataType[] , shadcn: boolean }) {
  return shadcn
    ? `
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
${
  data.filter(
    (item) =>
      item.type !== "checkbox" &&
      item.type !== "radio" &&
      item.type !== "dropdown"
  ).length > 0
    ? `import { Input } from "@/components/ui/input";`
    : ""
}

${
  data.filter((item) => item.type === "dropdown").length > 0
    ? `import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";`
    : ""
}
${
  data.filter((item) => item.type === "checkbox").length > 0
    ? `import { Checkbox } from "@/components/ui/checkbox";`
    : ""
}
${
  data.filter((item) => item.type === "radio").length > 0
    ? `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`
    : ""
}
`
    : ``;
}

export default function useGenerateData({
  data,
  react,
  typescript,
  css,
  tailwindcss,
  shadcn,
  rhf,
}: {
  data: DataType[];
  react: boolean;
  typescript: boolean;
  css: boolean;
  tailwindcss: boolean;
  shadcn: boolean;
  rhf: boolean;
}) {
  //I have to check if the type before importing the components

  const result = `
${
  react
    ? `// Add use client here if you are using Next.js
//"use client"`
    : ``
}
${!rhf && react ? `import { useState } from "react";` : ``}
${shadcn ? generateShadcnImports({ shadcn, data }) : ``}
${rhf ? generateRhfImports() : ``}
${!rhf && react ? `import { Label } from "@/components/ui/label"` : ``}
${
  typescript
    ? `type FormSchema = { ${data
        .map((item) => {
          return `
    ${item.name}: ${generateTypes(item.type)},`;
        })
        .join("")}
}`
    : ""
}

${rhf ? generateCheckboxData(data) : ``}
export default function FormComponent() {
    ${
      !rhf && react
        ? `const [data, setData] = useState<FormSchema>({
        ${data
          .map((item) => {
            return `
        ${item.name}: ${item.type == "checkbox" ? "[]" : `""`},`;
          })
          .join("")}
      });`
        : ``
    }
    ${
      rhf
        ? `const form = useForm${typescript ? "<FormSchema>" : ``}({ 
      defaultValues: {${data
        .map((item) => {
          return `
          ${item.name}: ${item.type == "checkbox" ? "[]" : `""`},`;
        })
        .join("")}
      } 
    });`
        : ``
    }
    
    function onSubmit(${
      rhf
        ? `data${typescript ? ": FormSchema" : ``}`
        : react
        ? `e: React.FormEvent<HTMLFormElement>`
        : ``
    }) {
      console.log(data);
      const requiredFields${
        typescript ? `: Record<keyof FormSchema, boolean>` : ``
      } = {${data
    .map((item) => {
      return `${item.name}: ${item.required ? "true" : "false"},`;
    })
    .join("")}};
      const hasRequiredFields = (Object.keys(data) ${
        typescript ? `as Array<keyof FormSchema>` : ``
      }).every((key) => {
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
        toast({ description: "Please fill in all required fields" })
        ${
          react && !rhf
            ? `e.preventDefault(); //Comment this line if you dont want to prevent default`
            : ``
        }
        return;
      }
      ${
        shadcn
          ? `toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      })
      ${
        react && !rhf
          ? `e.preventDefault(); //Comment this line if you dont want to prevent default`
          : ``
      }
      ;`
          : ``
      }
    }
    return (
        ${rhf ? `<Form {...form}>` : ``}
          <form onSubmit={${
            rhf ? `form.handleSubmit(onSubmit)` : `onSubmit`
          }} className="w-full flex flex-col gap-4 p-4">${data
    .map((item) => {
      return `${
        react && shadcn && rhf
          ? item.type === "checkbox"
            ? generateRhfCheckboxCode({ item })
            : item.type === "radio"
            ? generateRhfRadioCode({ item })
            : item.type === "dropdown"
            ? generateRhfDropdownCode({ item })
            : item.type === "textarea"
            ? generateRhfTextareaCode({ item })
            : generateRhfInputCode({ item })
          : react && shadcn && !rhf
          ? item.type === "checkbox"
            ? generateShadcnCheckboxCode({ item })
            : item.type === "radio"
            ? generateShadcnRadioCode({ item })
            : item.type === "dropdown"
            ? generateShadcnDropdownCode({ item })
            : item.type === "textarea"
            ? generateShadcnTextareaCode({ item })
            : generateShadcnInputCode({ item })
          : ""
      } `;
    })
    .join("")}
            <Button type="submit">Submit</Button>
          </form>
        ${rhf ? `</Form>` : ``}
    );
}
`;

  const cssValue = `
*, ::before, ::after {
  
}
.mb-4 {
  margin-bottom: 1rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.flex {
  display: flex;
}
.w-\[340px\] {
  width: 340px;
}
.w-full {
  width: 100%;
}
.flex-row {
  flex-direction: row;
}
.flex-col {
  flex-direction: column;
}
.items-start {
  align-items: flex-start;
}
.items-center {
  align-items: center;
}
.gap-2 {
  gap: 0.5rem;
}
.gap-4 {
  gap: 1rem;
}
.space-x-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.75rem * var(--tw-space-x-reverse));
  margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse)));
}
.space-y-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0px * var(--tw-space-y-reverse));
}
.space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.rounded-md {
  border-radius: 0.375rem;
}
.bg-slate-950 {
  --tw-bg-opacity: 1;
  background-color: rgb(2 6 23 / var(--tw-bg-opacity));
}
.p-4 {
  padding: 1rem;
}
.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.font-normal {
  font-weight: 400;
}
.text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

`;

  return {
    main: result,
    css: tailwindcss || css ? null : cssValue,
    js: null,
  };
}
