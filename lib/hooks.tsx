import { AnswerTypes, DataType } from "./types/formdata";

function generateShadcnCheckboxCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name="${item.name}"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>${item.label}</FormLabel>
                    ${
                      item.description
                        ? `<FormDescription>{item.description}</FormDescription>`
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
function convertString(str:string){
  return str
    .split("")
    .map((char) => char.toLowerCase().replace(" ", "_"))
    .join("");
}
function generateShadcnRadioCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name="${item.name}"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>${item.label}</FormLabel>
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
                  ${
                    item.description
                      ? `<FormDescription>${item.description}</FormDescription>`
                      : ``
                  }
                  <FormMessage />
                </FormItem>
              )}
            />`;
}

function generateShadcnDropdownCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name="${item.name}"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>${item.label}</FormLabel>
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

function generateShadcnInputCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name="${item.name}"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>${item.label}</FormLabel>
                  <FormControl>
                    <Input type="${item.type}" placeholder="${
    item.placeholder
  }" {...field} />
                  </FormControl>
                  ${
                    item.description
                      ? `<FormDescription>{item.description}</FormDescription>`
                      : ``
                  }
                  <FormMessage />
                </FormItem>
              )}
            />
  `;
}

function generateShadcnTextareaCode({ item }: { item: DataType }) {
  return `
            <FormField
              control={form.control}
              name=${item.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>${item.label}</FormLabel>
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

function generateShadcnImports({ data }: { data: DataType[] }) {
  return `
${ data.filter(item => item.type !== "checkbox" && item.type !== "radio" && item.type !== "dropdown").length > 0 ? `import { Input } from "@/components/ui/input";`: ""}

${ data.filter(item => item.type === "dropdown").length > 0 ? `import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";\nimport { Label } from "@/components/ui/label";` : ""}
${ data.filter(item => item.type === "checkbox").length > 0 ? `import { Checkbox } from "@/components/ui/checkbox";`: ""}
${ data.filter(item => item.type === "radio").length > 0 ? `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`: ""}
`;
}


function generateTypes(type:AnswerTypes){
  switch(type){
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

        case "radio":
          const radioOptions = item.options
            ?.map(
              (option) =>
                `{ id: "${convertString(option.label)}", label: "${
                  option.label
                }" }`
            )
            .join(", ");
          return `const ${item.name}_items = [${radioOptions}];`;

        default:
          return "";
      }
    })
    .join("\n");
}



export default function useGenerateData({ data }: { data: DataType[] }) {
  //I have to check if the type before importing the components

  const result = `
"use client"
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
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
${generateShadcnImports({ data })}
type FormSchema = { ${data
    .map((item) => {
      return `
    ${item.name}: ${generateTypes(item.type)},`;
    })
    .join("")}
}

${generateCheckboxData(data)}

export default function FormComponent() {
    const form = useForm<FormSchema>({ 
      defaultValues: {${data
        .map((item) => {
          return `
          ${item.name}: ${item.type == "checkbox" ? "[]" : `""`},`;
        })
        .join("")}
      } 
    });
    function onSubmit(data:FormSchema) {
      console.log(data);
      toast({
        title: "You submitted the following values:",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
    }
    return (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 p-4">${data
            .map((item) => {
              return `${
                item.type === "checkbox"
                  ? generateShadcnCheckboxCode({ item })
                  : item.type === "radio"
                  ? generateShadcnRadioCode({ item })
                  : item.type === "dropdown"
                  ? generateShadcnDropdownCode({ item })
                  : item.type === "textarea"
                  ? generateShadcnTextareaCode({ item })
                  : generateShadcnInputCode({ item })
              } `;
            })
            .join("")}
            <Button type="submit">Submit</Button>
          </form>
        </Form>
    );
}
`;

  return result;
}
