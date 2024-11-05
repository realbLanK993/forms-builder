"use client";
import { useFormData } from "@/context/formdata";
import useGenerateData from "@/lib/hooks";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";

export default function CodeHighlight() {
  const { formData } = useFormData();
  const codeBlock = useGenerateData({ data: formData });
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(codeBlock)
      .then(() => {
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000); // Clear success message after 2 seconds
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div>
      <div className="flex justify-end relative">
        <Button size={"icon"} variant={"outline"} onClick={handleCopy} style={{ marginBottom: "10px" }}>
        <Copy />
      </Button>
      {copySuccess && <span className="absolute -right-16 top-2 font-semibold text-sm" style={{ color: "green" }}>Copied!</span>}
      </div>
      
      <Highlight theme={themes.nightOwl} code={codeBlock} language="tsx">
        {({ style, tokens, getTokenProps }) => (
          <pre className="p-0 m-0 pl-4 overflow-x-scroll" style={style}>
            {tokens.map((line, i) => (
              <div key={i}>
                {line.map((token, key) => (
                  <span key={key} {...getTokenProps({ token })} />
                ))}
              </div>
            ))}
          </pre>
        )}
      </Highlight>
    </div>
  );
}
