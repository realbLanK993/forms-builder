import { AnswerTypes, DataType } from "./types/formdata";

class FormField {
  constructor(
    public config: DataType // Use DataType directly for full type safety
  ) {}

  generate({
    react,
    shadcn,
    rhf,
  }: {
    react: boolean;
    shadcn: boolean;
    rhf: boolean;
  }): string {
    if (react && shadcn && rhf) {
      return this.generateRhfCode();
    } else if (react && shadcn && !rhf) {
      return this.generateShadcnCode();
    } else if (react && !shadcn && !rhf) {
      return this.generateReactCode();
    }
    return "";
  }

  private generateReactCode(): string {
    switch (this.config.type) {
      case "checkbox":
        return [
          `<div className="flex flex-col gap-2">`,
          `<label htmlFor="${this.config.name}">${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</label>`,
          `{`,
          `  ${this.config.name}_items.map((option, index) => (`,
          `    <div id="${this.config.name}" key={index} className="flex items-center space-x-2">`,
          `      <input`,
          `        name="${this.config.name}"`,
          `        type="checkbox"`,
          `        onChange={() => {`,
          `          const newValue = [...data.${this.config.name}];`,
          `          setData((data) => {`,
          `            if (newValue.includes(option.value)) {`,
          `              const updatedValue = newValue.filter((item) => item !== option.value);`,
          `              return { ...data, ${this.config.name}: updatedValue };`,
          `            } else {`,
          `              return { ...data, ${this.config.name}: [...newValue, option.value] };`,
          `            }`,
          `          });`,
          `        }}`,
          `        checked={data.${this.config.name}.includes(option.value)}`,
          `        id={option.value + "" + "${this.config.name}"}`,
          `      />`,
          `      <label htmlFor={option.value + "" + "${this.config.name}"}>{option.label}</label>`,
          `    </div>`,
          `  ))`,
          `}`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
      case "radio":
        return [
          `<div className="flex flex-col gap-2">`,
          `<label htmlFor="${this.config.name}">${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</label>`,
          `{`,
          `  ${this.config.name}_items.map((option, index) => (`,
          `    <div id="${this.config.name}" key={index} className="flex items-center space-x-2">`,
          `      <input`,
          `        name="${this.config.name}"`,
          `        type="radio"`,
          `        onChange={(e) => setData((data) => ({ ...data, ${this.config.name}: e.target.value }))}`,
          `        value={option.value}`,
          `        id={option.value + "" + "${this.config.name}"}`,
          `      />`,
          `      <label htmlFor={option.value + "" + "${this.config.name}"}>{option.label}</label>`,
          `    </div>`,
          `  ))`,
          `}`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
      case "dropdown":
        return [
          `<div className="flex flex-col gap-2">`,
          `<label htmlFor="${this.config.name}">${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</label>`,
          `<select`,
          `  onChange={(e) => setData((data) => ({ ...data, ${this.config.name}: e.target.value }))}`,
          `  value={data.${this.config.name}}`,
          `  id="${this.config.name}"`,
          `>`,
          this.config.placeholder
            ? `<option disabled selected value="">${this.config.placeholder}</option>`
            : `<option disabled selected value="">Select an option</option>`,
          `{`,
          `  ${this.config.name}_items.map((option, index) => (`,
          `    <option key={index} value={option.value}>{option.label}</option>`,
          `  ))`,
          `}`,
          `</select>`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
      case "textarea":
        return [
          `<div className="flex flex-col gap-2">`,
          `<label htmlFor="${this.config.name}">${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</label>`,
          `<textarea`,
          `  onChange={(e) => setData((data) => ({ ...data, ${this.config.name}: e.target.value }))}`,
          `  value={data.${this.config.name}}`,
          `  id="${this.config.name}"`,
          `  placeholder="${this.config.placeholder}"`,
          `/>`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
      default:
        return [
          `<div className="flex flex-col gap-2">`,
          `<label htmlFor="${this.config.name}">${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</label>`,
          `<input`,
          `  onChange={(e) => setData((data) => ({ ...data, ${this.config.name}: e.target.value }))}`,
          `  value={data.${this.config.name}}`,
          `  id="${this.config.name}"`,
          `  placeholder="${this.config.placeholder}"`,
          `  type="${this.config.type}"`,
          `/>`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
    }
  }

  private generateShadcnCode(): string {
    switch (this.config.type) {
      case "checkbox":
        return [
          `<div className="flex flex-col gap-2">`,
          `<Label htmlFor="${this.config.name}">${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</Label>`,
          `{`,
          `  ${this.config.name}_items.map((option, index) => (`,
          `    <div id="${this.config.name}" key={index} className="flex items-center space-x-2">`,
          `      <Checkbox`,
          `        onCheckedChange={() => {`,
          `          setData((data) => {`,
          `            const newValue = data.${this.config.name};`,
          `            newValue.includes(option.value) ? newValue.splice(newValue.indexOf(option.value), 1) : newValue.push(option.value);`,
          `            return { ...data, ${this.config.name}: [...newValue] };`,
          `          });`,
          `        }}`,
          `        checked={data.${this.config.name}.includes(option.value)}`,
          `        id={option.value + "" + "${this.config.name}"}`,
          `      />`,
          `      <Label htmlFor={option.value + "" + "${this.config.name}"}>{option.label}</Label>`,
          `    </div>`,
          `  ))`,
          `}`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
      case "radio":
        return [
          `<div className="flex flex-col gap-2">`,
          `<Label htmlFor="${this.config.name}">${this.config.label}</Label>`,
          `<RadioGroup onValueChange={(value) => setData((data) => ({ ...data, ${this.config.name}: value }))} value={data.${this.config.name}}>`,
          this.config.options
            ?.map((option) =>
              [
                `<div className="flex items-center space-x-2">`,
                `<RadioGroupItem id="${this.config.name}_${option.value}" value="${option.value}" />`,
                `<Label htmlFor="${this.config.name}_${option.value}">${option.label}</Label>`,
                `</div>`,
              ].join("\n")
            )
            .join("\n") || "",
          `</RadioGroup>`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
      case "dropdown":
        return [
          `<div className="flex flex-col gap-2">`,
          `<Label htmlFor="${this.config.name}">${this.config.label}</Label>`,
          `<Select`,
          `  onValueChange={(value) => setData((data) => ({ ...data, ${this.config.name}: value }))}`,
          `  value={data.${this.config.name}}`,
          `>`,
          `  <SelectTrigger>`,
          `    <SelectValue placeholder="${this.config.placeholder}" />`,
          `  </SelectTrigger>`,
          `  <SelectContent id="${this.config.name}">`,
          this.config.options
            ?.map(
              (option) =>
                `<SelectItem value="${option.value}">${option.label}</SelectItem>`
            )
            .join("\n") || "",
          `  </SelectContent>`,
          `</Select>`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
      case "textarea":
        return [
          `<div className="flex flex-col gap-2">`,
          `<Label htmlFor="${this.config.name}">${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</Label>`,
          `<Textarea`,
          `  onChange={(e) => setData((data) => ({ ...data, ${this.config.name}: e.target.value }))}`,
          `  value={data.${this.config.name}}`,
          `  id="${this.config.name}"`,
          `  placeholder="${this.config.placeholder}"`,
          `  className="border"`,
          `/>`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
      default:
        return [
          `<div className="flex flex-col gap-2">`,
          `<Label htmlFor="${this.config.name}">${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</Label>`,
          `<Input`,
          `  onChange={(e) => setData((data) => ({ ...data, ${this.config.name}: e.target.value }))}`,
          `  value={data.${this.config.name}}`,
          `  id="${this.config.name}"`,
          `  placeholder="${this.config.placeholder}"`,
          `  type="${this.config.type}"`,
          `  className="border"`,
          `/>`,
          this.config.description
            ? `<p className="text-sm text-muted-foreground">${this.config.description}</p>`
            : "",
          `</div>`,
        ]
          .filter(Boolean)
          .join("\n");
    }
  }

  private generateRhfCode(): string {
    switch (this.config.type) {
      case "checkbox":
        return [
          `<FormField`,
          `  control={form.control}`,
          `  name="${this.config.name}"`,
          `  render={() => (`,
          `    <FormItem>`,
          `      <div className="mb-4">`,
          `        <FormLabel>${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</FormLabel>`,
          this.config.description
            ? `<FormDescription>${this.config.description}</FormDescription>`
            : "",
          `      </div>`,
          `      {${this.config.name}_items.map((item) => (`,
          `        <FormField`,
          `          key={item.id}`,
          `          control={form.control}`,
          `          name="${this.config.name}"`,
          `          render={({ field }) => (`,
          `            <FormItem className="flex flex-row items-start space-x-3 space-y-0 gap-2">`,
          `              <FormControl>`,
          `                <Checkbox`,
          `                  checked={field.value?.includes(item.id)}`,
          `                  onCheckedChange={(checked) => {`,
          `                    return checked`,
          `                      ? field.onChange([...field.value, item.id])`,
          `                      : field.onChange(field.value?.filter((value) => value !== item.id))`,
          `                  }}`,
          `                />`,
          `              </FormControl>`,
          `              <FormLabel className="text-sm font-normal">{item.label}</FormLabel>`,
          `            </FormItem>`,
          `          )}`,
          `        />`,
          `      ))}`,
          `      <FormMessage />`,
          `    </FormItem>`,
          `  )}`,
          `/>`,
        ]
          .filter(Boolean)
          .join("\n");
      case "radio":
        return [
          `<FormField`,
          `  control={form.control}`,
          `  name="${this.config.name}"`,
          `  render={({ field }) => (`,
          `    <FormItem className="space-y-3">`,
          `      <FormLabel>${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</FormLabel>`,
          this.config.description
            ? `<FormDescription>${this.config.description}</FormDescription>`
            : "",
          `      <FormControl>`,
          `        <RadioGroup`,
          `          onValueChange={field.onChange}`,
          `          defaultValue={field.value}`,
          `          className="flex flex-col space-y-1"`,
          `        >`,
          this.config.options
            ?.map((option) =>
              [
                `<FormItem className="flex items-center space-x-3 space-y-0 gap-2">`,
                `  <FormControl>`,
                `    <RadioGroupItem value="${option.value}" />`,
                `  </FormControl>`,
                `  <FormLabel className="font-normal">${option.label}</FormLabel>`,
                `</FormItem>`,
              ].join("\n")
            )
            .join("\n") || "",
          `        </RadioGroup>`,
          `      </FormControl>`,
          `      <FormMessage />`,
          `    </FormItem>`,
          `  )}`,
          `/>`,
        ]
          .filter(Boolean)
          .join("\n");
      case "dropdown":
        return [
          `<FormField`,
          `  control={form.control}`,
          `  name="${this.config.name}"`,
          `  render={({ field }) => (`,
          `    <FormItem>`,
          `      <FormLabel>${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</FormLabel>`,
          `      <Select name="${this.config.name}" onValueChange={field.onChange} defaultValue={field.value}>`,
          `        <FormControl>`,
          `          <SelectTrigger>`,
          `            <SelectValue placeholder="${this.config.placeholder}" />`,
          `          </SelectTrigger>`,
          `        </FormControl>`,
          `        <SelectContent>`,
          this.config.options
            ?.map(
              (option) =>
                `<SelectItem value="${option.value}">${option.label}</SelectItem>`
            )
            .join("\n") || "",
          `        </SelectContent>`,
          `      </Select>`,
          this.config.description
            ? `<FormDescription>${this.config.description}</FormDescription>`
            : "",
          `      <FormMessage />`,
          `    </FormItem>`,
          `  )}`,
          `/>`,
        ]
          .filter(Boolean)
          .join("\n");
      case "textarea":
        return [
          `<FormField`,
          `  control={form.control}`,
          `  name="${this.config.name}"`,
          `  render={({ field }) => (`,
          `    <FormItem>`,
          `      <FormLabel>${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</FormLabel>`,
          `      <FormControl>`,
          `        <Textarea placeholder="${this.config.placeholder}" {...field} />`,
          `      </FormControl>`,
          this.config.description
            ? `<FormDescription>${this.config.description}</FormDescription>`
            : "",
          `      <FormMessage />`,
          `    </FormItem>`,
          `  )}`,
          `/>`,
        ]
          .filter(Boolean)
          .join("\n");
      default:
        return [
          `<FormField`,
          `  control={form.control}`,
          `  name="${this.config.name}"`,
          `  render={({ field }) => (`,
          `    <FormItem>`,
          `      <FormLabel>${this.config.label}${this.config.required ? ` <span className="text-red-500">*</span>` : ""}</FormLabel>`,
          `      <FormControl>`,
          `        <Input type="${this.config.type}" placeholder="${this.config.placeholder}" {...field} />`,
          `      </FormControl>`,
          this.config.description
            ? `<FormDescription>${this.config.description}</FormDescription>`
            : "",
          `      <FormMessage />`,
          `    </FormItem>`,
          `  )}`,
          `/>`,
        ]
          .filter(Boolean)
          .join("\n");
    }
  }
}

class Form {
  private fields: FormField[];

  constructor(
    private options: {
      data: DataType[];
      react: boolean;
      typescript: boolean;
      css: boolean;
      tailwindcss: boolean;
      shadcn: boolean;
      rhf: boolean;
    }
  ) {
    this.fields = options.data.map((item) => new FormField(item));
  }

  addField(field: DataType): this {
    this.fields.push(new FormField(field));
    return this;
  }

  private generateTypes(type: AnswerTypes): string {
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

  private generateImports(): string {
    const lines: string[] = [];
    if (this.options.react)
      lines.push(
        `// Add use client here if you are using Next.js\n//"use client"`
      );
    if (!this.options.rhf && this.options.react)
      lines.push(`import { useState } from "react";`);
    if (this.options.shadcn) {
      lines.push(`import { Button } from "@/components/ui/button";`);
      lines.push(`import { toast } from "@/hooks/use-toast";`);
      if (
        this.fields.some(
          (f) => !["checkbox", "radio", "dropdown"].includes(f.config.type)
        )
      ) {
        lines.push(`import { Input } from "@/components/ui/input";`);
      }
      if (this.fields.some((f) => f.config.type === "dropdown")) {
        lines.push(
          `import { Select, SelectItem, SelectTrigger, SelectContent, SelectValue } from "@/components/ui/select";`
        );
      }
      if (this.fields.some((f) => f.config.type === "checkbox")) {
        lines.push(`import { Checkbox } from "@/components/ui/checkbox";`);
      }
      if (this.fields.some((f) => f.config.type === "radio")) {
        lines.push(
          `import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";`
        );
      }
    }
    if (this.options.rhf) {
      lines.push(
        [
          `import {`,
          `  Form,`,
          `  FormControl,`,
          `  FormDescription,`,
          `  FormField,`,
          `  FormItem,`,
          `  FormLabel,`,
          `  FormMessage,`,
          `} from "@/components/ui/form";`,
          `import { useForm } from "react-hook-form";`,
        ].join("\n")
      );
    }
    if (!this.options.rhf && this.options.react && this.options.shadcn)
      lines.push(`import { Label } from "@/components/ui/label";`);
    if (this.options.react && this.options.shadcn)
      lines.push(`import { useToast } from "@/hooks/use-toast";`);
    return lines.join("\n");
  }

  private generateCheckboxData(): string {
    const applicableTypes = this.options.shadcn
      ? ["checkbox"]
      : ["checkbox", "radio", "dropdown"];
    return this.fields
      .filter((field) => applicableTypes.includes(field.config.type))
      .map((field) => {
        const options = field.config.options
          ?.map(
            (option) =>
              `{ id: "${option.value}", label: "${option.label}", value: "${option.value}" }`
          )
          .join(", ");
        return `const ${field.config.name}_items = [${options}];`;
      })
      .join("\n");
  }

  generate(): { main: string; css: string | null; js: null } {
    const lines: string[] = [
      this.generateImports(),
      this.options.typescript
        ? [
            `type FormSchema = {`,
            this.fields
              .map(
                (field) =>
                  `  ${field.config.name}: ${this.generateTypes(field.config.type)},`
              )
              .join("\n"),
            `};`,
          ].join("\n")
        : "",
      this.generateCheckboxData(),
      `export default function FormComponent() {`,
      this.options.react && this.options.shadcn
        ? `  const { toast } = useToast();`
        : "",
      !this.options.rhf && this.options.react
        ? [
            `  const [data, setData] = useState${this.options.typescript ? "<FormSchema>" : ""}({`,
            this.fields
              .map(
                (field) =>
                  `    ${field.config.name}: ${field.config.type === "checkbox" ? "[]" : `""`},`
              )
              .join("\n"),
            `  });`,
          ].join("\n")
        : "",
      this.options.rhf
        ? [
            `  const form = useForm${this.options.typescript ? "<FormSchema>" : ""}({`,
            `    defaultValues: {`,
            this.fields
              .map(
                (field) =>
                  `      ${field.config.name}: ${field.config.type === "checkbox" ? "[]" : `""`},`
              )
              .join("\n"),
            `    },`,
            `  });`,
          ].join("\n")
        : "",
      `  function onSubmit(${this.options.rhf ? `data${this.options.typescript ? ": FormSchema" : ""}` : this.options.react ? `e${this.options.typescript ? ": React.FormEvent<HTMLFormElement>" : ""}` : ""}) {`,
      `    console.log(data);`,
      `    const requiredFields${this.options.typescript ? ": Record<keyof FormSchema, boolean>" : ""} = {`,
      this.fields
        .map(
          (field) =>
            `      ${field.config.name}: ${field.config.required ? "true" : "false"},`
        )
        .join("\n"),
      `    };`,
      `    const hasRequiredFields = (Object.keys(data)${this.options.typescript ? " as Array<keyof FormSchema>" : ""}).every((key) => {`,
      `      if (requiredFields[key]) {`,
      `        const value = data[key];`,
      `        if (Array.isArray(value)) return value.length > 0;`,
      `        return value !== "";`,
      `      }`,
      `      return true;`,
      `    });`,
      `    if (!hasRequiredFields) {`,
      this.options.shadcn
        ? `      toast({ description: "Please fill in all required fields" });`
        : `      alert("Please fill in all required fields");`,
      this.options.react && !this.options.rhf
        ? `      e.preventDefault(); // Comment this line if you don’t want to prevent default`
        : "",
      `      return;`,
      `    }`,
      this.options.shadcn
        ? [
            `    toast({`,
            `      title: "You submitted the following values:",`,
            `      description: (`,
            `        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">`,
            `          <code className="text-white">{JSON.stringify(data, null, 2)}</code>`,
            `        </pre>`,
            `      ),`,
            `    });`,
          ].join("\n")
        : [
            this.options.react && !this.options.rhf
              ? `    e.preventDefault(); // Comment this line if you don’t want to prevent default`
              : "",
            `    alert(JSON.stringify(data, null, 2));`,
          ].join("\n"),
      `  }`,
      `  return (`,
      this.options.rhf ? `    <Form {...form}>` : "",
      `      <form onSubmit={${this.options.rhf ? "form.handleSubmit(onSubmit)" : "onSubmit"}} className="w-full flex flex-col gap-4 p-4">`,
      this.fields.map((field) => field.generate(this.options)).join("\n"),
      this.options.react && this.options.shadcn
        ? `        <Button type="submit">Submit</Button>`
        : `        <button type="submit">Submit</button>`,
      `      </form>`,
      this.options.rhf ? `    </Form>` : "",
      `  );`,
      `}`,
    ];
    const main = lines.filter(Boolean).join("\n");

    const cssValue = this.options.tailwindcss
      ? null
      : `
.mb-4 { margin-bottom: 1rem; }
.mt-2 { margin-top: 0.5rem; }
.flex { display: flex; }
.w-\\[340px\\] { width: 340px; }
.w-full { width: 100%; }
.flex-row { flex-direction: row; }
.flex-col { flex-direction: column; }
.items-start { align-items: flex-start; }
.items-center { align-items: center; }
.gap-2 { gap: 0.5rem; }
.gap-4 { gap: 1rem; }
.space-x-3 > :not([hidden]) ~ :not([hidden]) { --tw-space-x-reverse: 0; margin-right: calc(0.75rem * var(--tw-space-x-reverse)); margin-left: calc(0.75rem * calc(1 - var(--tw-space-x-reverse))); }
.space-y-0 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(0px * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0px * var(--tw-space-y-reverse)); }
.space-y-1 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0.25rem * var(--tw-space-y-reverse)); }
.space-y-3 > :not([hidden]) ~ :not([hidden]) { --tw-space-y-reverse: 0; margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse))); margin-bottom: calc(0.75rem * var(--tw-space-y-reverse)); }
.rounded-md { border-radius: 0.375rem; }
.bg-slate-950 { --tw-bg-opacity: 1; background-color: rgb(2 6 23 / var(--tw-bg-opacity)); }
.p-4 { padding: 1rem; }
.text-sm { font-size: 0.875rem; line-height: 1.25rem; }
.font-normal { font-weight: 400; }
.text-white { --tw-text-opacity: 1; color: rgb(255 255 255 / var(--tw-text-opacity)); }
`;

    return { main, css: cssValue, js: null };
  }
}

export default function useGenerateData(options: {
  data: DataType[];
  react: boolean;
  typescript: boolean;
  css: boolean;
  tailwindcss: boolean;
  shadcn: boolean;
  rhf: boolean;
}): { main: string; css: string | null; js: null } {
  const form = new Form(options);
  return form.generate();
}
