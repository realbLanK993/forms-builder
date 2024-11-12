// Add use client here if you are using Next.js
//"use client"
import { useState } from "react";

export default function FormComponent() {
  const [data, setData] = useState({
    file_da0a455f: "",
  });

  function onSubmit(e) {
    console.log(data);
    const requiredFields = { file_da0a455f: true };
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
        <label htmlFor="file_da0a455f">
          Username <span className="text-red-500">*</span>{" "}
        </label>
        <input
          onChange={(e) => {
            setData((data) => {
              return {
                ...data,
                file_da0a455f: e.target.value,
              };
            });
          }}
          value={data.file_da0a455f}
          id="file_da0a455f"
          placeholder=""
          type="file"
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
