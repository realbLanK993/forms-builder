// Add use client here if you are using Next.js
//"use client"
import { useState } from "react";
const checkbox_f5fe5b63_items = [
  { id: "option1", label: "Option 1", value: "option1" },
  { id: "option2", label: "Option 2", value: "option2" },
  { id: "option3", label: "Option 3", value: "option3" },
];
const radio_804ddce1_items = [
  { id: "option1", label: "Option 1", value: "option1" },
  { id: "option2", label: "Option 2", value: "option2" },
  { id: "option3", label: "Option 3", value: "option3" },
];
const dropdown_8bfff5a1_items = [
  { id: "option1", label: "Option 1", value: "option1" },
  { id: "option2", label: "Option 2", value: "option2" },
  { id: "option3", label: "Option 3", value: "option3" },
];
export default function FormComponent() {
  const [data, setData] = useState({
    text_077758b9: "",
    email_0df35bd4: "",
    checkbox_f5fe5b63: [],
    radio_804ddce1: "",
    dropdown_8bfff5a1: "",
    number_4ac0c2dd: "",
  });
  function onSubmit(e) {
    console.log(data);
    const requiredFields = {
      text_077758b9: true,
      email_0df35bd4: false,
      checkbox_f5fe5b63: false,
      radio_804ddce1: false,
      dropdown_8bfff5a1: false,
      number_4ac0c2dd: false,
    };
    const hasRequiredFields = Object.keys(data).every((key) => {
      if (requiredFields[key]) {
        const value = data[key];
        if (Array.isArray(value)) return value.length > 0;
        return value !== "";
      }
      return true;
    });
    if (!hasRequiredFields) {
      alert("Please fill in all required fields");
      e.preventDefault(); // Comment this line if you don’t want to prevent default
      return;
    }
    e.preventDefault(); // Comment this line if you don’t want to prevent default
    alert(JSON.stringify(data, null, 2));
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="text_077758b9">
          Username <span className="text-red-500">*</span>
        </label>
        <input
          onChange={(e) =>
            setData((data) => ({ ...data, text_077758b9: e.target.value }))
          }
          value={data.text_077758b9}
          id="text_077758b9"
          placeholder=""
          type="text"
        />
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="email_0df35bd4">Email</label>
        <input
          onChange={(e) =>
            setData((data) => ({ ...data, email_0df35bd4: e.target.value }))
          }
          value={data.email_0df35bd4}
          id="email_0df35bd4"
          placeholder=""
          type="email"
        />
        <p className="text-sm text-muted-foreground">
          Checning the description now
        </p>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="checkbox_f5fe5b63">Checkbox</label>
        {checkbox_f5fe5b63_items.map((option, index) => (
          <div
            id="checkbox_f5fe5b63"
            key={index}
            className="flex items-center space-x-2"
          >
            <input
              name="checkbox_f5fe5b63"
              type="checkbox"
              onChange={() => {
                const newValue = [...data.checkbox_f5fe5b63];
                setData((data) => {
                  if (newValue.includes(option.value)) {
                    const updatedValue = newValue.filter(
                      (item) => item !== option.value
                    );
                    return { ...data, checkbox_f5fe5b63: updatedValue };
                  } else {
                    return {
                      ...data,
                      checkbox_f5fe5b63: [...newValue, option.value],
                    };
                  }
                });
              }}
              checked={data.checkbox_f5fe5b63.includes(option.value)}
              id={option.value + "" + "checkbox_f5fe5b63"}
            />
            <label htmlFor={option.value + "" + "checkbox_f5fe5b63"}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="radio_804ddce1">Radio</label>
        {radio_804ddce1_items.map((option, index) => (
          <div
            id="radio_804ddce1"
            key={index}
            className="flex items-center space-x-2"
          >
            <input
              name="radio_804ddce1"
              type="radio"
              onChange={(e) =>
                setData((data) => ({ ...data, radio_804ddce1: e.target.value }))
              }
              value={option.value}
              id={option.value + "" + "radio_804ddce1"}
            />
            <label htmlFor={option.value + "" + "radio_804ddce1"}>
              {option.label}
            </label>
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="dropdown_8bfff5a1">Dropdown</label>
        <select
          onChange={(e) =>
            setData((data) => ({ ...data, dropdown_8bfff5a1: e.target.value }))
          }
          value={data.dropdown_8bfff5a1}
          id="dropdown_8bfff5a1"
        >
          <option disabled selected value="">
            Select an option
          </option>
          {dropdown_8bfff5a1_items.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="number_4ac0c2dd">NUmber</label>
        <input
          onChange={(e) =>
            setData((data) => ({ ...data, number_4ac0c2dd: e.target.value }))
          }
          value={data.number_4ac0c2dd}
          id="number_4ac0c2dd"
          placeholder=""
          type="number"
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}
