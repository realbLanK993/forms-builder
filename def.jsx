// Add use client here if you are using Next.js
//"use client"

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

const accept_items = [
  {
    id: "i_accept_to_terms_and_conditions",
    label: "I accept to terms and conditions",
  },
];
export default function FormComponent() {
  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
      gender: "",
      accept: [],
    },
  });
  function onSubmit(data) {
    console.log(data);
    const requiredFields = {
      username: false,
      email: true,
      password: true,
      gender: false,
      accept: true,
    };
    const hasRequiredFields = Object.keys(data).every((key) => {
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
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Enter your username"
                  {...field}
                />
              </FormControl>
              <FormDescription>Is this unique?</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Email <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input type="email" placeholder="" {...field} />
              </FormControl>
              <FormDescription>Check for unique</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Password <span className="text-red-500">*</span>{" "}
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="gender"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Gender </FormLabel>
              <Select defaultValue="male"></Select>
              <Select
                name="gender"
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your gender" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="accept"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>
                  {" "}
                  <span className="text-red-500">*</span>{" "}
                </FormLabel>
              </div>
              {accept_items.map((item) => (
                <FormField
                  key={item.id}
                  control={form.control}
                  name="accept"
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
                                  );
                            }}
                          />
                        </FormControl>
                        <FormLabel className="text-sm font-normal">
                          {item.label}
                        </FormLabel>
                      </FormItem>
                    );
                  }}
                />
              ))}
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
