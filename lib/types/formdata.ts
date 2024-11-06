export type AnswerTypes =
  | "text"
  | "email"
  | "password"
  | "number"
  | "url"
  | "tel"
  | "date"
  | "time"
  | "datetime-local"
  | "file"
  | "checkbox"
  | "radio"
  | "dropdown"
  | "textarea";

export type DataType = {
  uuid: string;
  name: string;
  label: string;
  type: AnswerTypes;
  required: boolean;
  placeholder?:string;
  description?: string;
  options?: OptionType[];
};

export type OptionType = {
  uuid: string;
  value: string;
  label: string;
};

export const options: AnswerTypes[] = [
  "text",
  "email",
  "number",
  "checkbox",
  "radio",
  "dropdown",
  "url",
  "tel",
  "datetime-local",
  "file",
  "date",
  "time",
  "password",
  "textarea"
];
