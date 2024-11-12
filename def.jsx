// Add use client here if you are using Next.js
//"use client"
import { useState } from "react";

const gender_items = [
  { id: "option1", label: "Option 1", value: "option1" },
  { id: "option2", label: "Option 2", value: "option2" },
  { id: "option3", label: "Option 3", value: "option3" },
  { id: "option4", label: "Option 4", value: "option4" },
];
const multiple_items = [
  { id: "option1", label: "Option 1", value: "option1" },
  { id: "option2", label: "Option 2", value: "option2" },
  { id: "option3", label: "Option 3", value: "option3" },
  { id: "option4", label: "Option 4", value: "option4" },
  { id: "option5", label: "Option 5", value: "option5" },
];
const single_items = [
  { id: "option1", label: "Option 1", value: "option1" },
  { id: "option2", label: "Option 2", value: "option2" },
  { id: "option3", label: "Option 3", value: "option3" },
  { id: "option4", label: "Option 4", value: "option4" },
];
export default function FormComponent() {
  const [data, setData] = useState({
    username: "",
    gender: "",
    multiple: [],
    single: "",
  });

  function onSubmit(e) {
    console.log(data);
    const requiredFields = {
      username: true,
      gender: true,
      multiple: true,
      single: true,
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
      alert("Please fill in all required fields");
      e.preventDefault(); //Comment this line if you dont want to prevent default
      return;
    }

    e.preventDefault(); //Comment this line if you dont want to prevent default
    alert(JSON.stringify(data, null, 2));
  }
  return (
    <form onSubmit={onSubmit} className="w-full flex flex-col gap-4 p-4">
      <div className="flex flex-col gap-2">
        <label htmlFor="username">
          Username <span className="text-red-500">*</span>{" "}
        </label>
        <input
          onChange={(e) => {
            setData((data) => {
              return {
                ...data,
                username: e.target.value,
              };
            });
          }}
          value={data.username}
          id="username"
          placeholder=""
          type="text"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="gender">
          Gender <span className="text-red-500">*</span>{" "}
        </label>
        <select
          onChange={(e) => {
            setData((data) => {
              return {
                ...data,
                gender: e.target.value,
              };
            });
          }}
          value={data.gender}
          id="gender"
        >
          <option disabled selected value="">
            Select an option
          </option>
          {gender_items.map((option, index) => {
            return (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            );
          })}
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="multiple">
          Check multiple <span className="text-red-500">*</span>{" "}
        </label>
        {multiple_items.map((option, index) => {
          return (
            <div
              id="multiple"
              key={index}
              className="flex items-center space-x-2"
            >
              <input
                name="multiple"
                type="checkbox"
                onChange={() => {
                  const newValue = [...data.multiple];
                  setData((data) => {
                    if (newValue.includes(option.value)) {
                      const updatedValue = newValue.filter(
                        (item) => item !== option.value
                      );
                      return {
                        ...data,
                        multiple: updatedValue,
                      };
                    } else {
                      return {
                        ...data,
                        multiple: [...newValue, option.value],
                      };
                    }
                  });
                }}
                checked={data.multiple.includes(option.value)}
                id={option.value + "" + "multiple"}
              />
              <label htmlFor={option.value + "" + "multiple"}>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="single">
          Check single <span className="text-red-500">*</span>{" "}
        </label>
        {single_items.map((option, index) => {
          return (
            <div
              id="single"
              key={index}
              className="flex items-center space-x-2"
            >
              <input
                name="single"
                type="radio"
                onChange={(e) => {
                  setData((data) => {
                    return {
                      ...data,
                      single: e.target.value,
                    };
                  });
                }}
                value={option.value}
                id={option.value + "" + "single"}
              />
              <label htmlFor={option.value + "" + "single"}>
                {option.label}
              </label>
            </div>
          );
        })}
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
