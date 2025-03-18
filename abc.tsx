// Add use client here if you are using Next.js
//"use client"
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "./components/ui/textarea";
type FormSchema = {
  text_c1630a16: string;
  email_11efe040: string;
  radio_34ba9af4: string;
  couter: string[];
  dropdown_4a86695f: string;
  password_ad3181f4: string;
  textarea_091672af: string;
};
const couter_items = [
  { id: "option1", label: "Option 1", value: "option1" },
  { id: "option2", label: "Option 2", value: "option2" },
  { id: "option3", label: "Option 3", value: "option3" },
  { id: "option4", label: "Option 4", value: "option4" },
];
export default function FormComponent() {
  const { toast } = useToast();
  const form = useForm<FormSchema>({
    defaultValues: {
      text_c1630a16: "",
      email_11efe040: "",
      radio_34ba9af4: "",
      couter: [],
      dropdown_4a86695f: "",
      password_ad3181f4: "",
      textarea_091672af: "",
    },
  });
  function onSubmit(data: FormSchema) {
    console.log(data);
    const requiredFields: Record<keyof FormSchema, boolean> = {
      text_c1630a16: true,
      email_11efe040: true,
      radio_34ba9af4: true,
      couter: true,
      dropdown_4a86695f: true,
      password_ad3181f4: true,
      textarea_091672af: true,
    };
    const hasRequiredFields = (
      Object.keys(data) as Array<keyof FormSchema>
    ).every((key) => {
      if (requiredFields[key]) {
        const value = data[key];
        if (Array.isArray(value)) return value.length > 0;
        return value !== "";
      }
      return true;
    });
    if (!hasRequiredFields) {
      toast({ description: "Please fill in all required fields" });
      return;
    }
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-4 p-4"
      >
        <FormField
          control={form.control}
          name="text_c1630a16"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Username <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email_11efe040"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="radio_34ba9af4"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>
                Do you play games <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col space-y-1"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0 gap-2">
                    <FormControl>
                      <RadioGroupItem value="yes" />
                    </FormControl>
                    <FormLabel className="font-normal">yes</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0 gap-2">
                    <FormControl>
                      <RadioGroupItem value="no" />
                    </FormControl>
                    <FormLabel className="font-normal">no</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="couter"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>
                  Wat games do you play <span className="text-red-500">*</span>
                </FormLabel>
              </div>
              {couter_items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="couter"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 gap-2">
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
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {item.label}
                      </FormLabel>
                    </FormItem>
                  )}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dropdown_4a86695f"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                GEnder <span className="text-red-500">*</span>
              </FormLabel>
              <Select
                name="dropdown_4a86695f"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Check" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="option1">Option 1</SelectItem>
                  <SelectItem value="option2">Option 2</SelectItem>
                  <SelectItem value="option3">Option 3</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>Just checking</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password_ad3181f4"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Paswrod <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Input type="password" placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="textarea_091672af"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Textarea <span className="text-red-500">*</span>
              </FormLabel>
              <FormControl>
                <Textarea placeholder="" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
