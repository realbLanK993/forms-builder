"use client";
import { useFormData } from "@/context/formdata";
import useGenerateData from "@/lib/hooks";
import { Highlight, themes } from "prism-react-renderer";
import { useState } from "react";
import { Button } from "./ui/button";
import { Copy } from "lucide-react";
import { useTheme } from "next-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


export default function CodeHighlight({react, typescript, css, tailwindcss, shadcn, rhf}: {react: boolean, typescript: boolean, css: boolean, tailwindcss: boolean, shadcn: boolean, rhf: boolean}) {
  const { formData } = useFormData();
  const fullData = useGenerateData({ data: formData, react, typescript, css, tailwindcss, shadcn, rhf });
  const codeBlock = fullData.main
  const cssBlock = fullData.css;
  const [copySuccess, setCopySuccess] = useState(false);
  const {theme} = useTheme();
  const [tab, setTab] = useState<string>("main");
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
    <div className="px-2">
      {/* <div>
        <Label className="text-base">Files in this page:</Label>
        <ul className="text-sm list-disc pl-8">
          <li>Forms.tsx</li>
        </ul>
      </div> */}
      <Tabs value={tab} onValueChange={setTab} className="">
        <div className="flex justify-between items-center relative">
          <TabsList className="bg-background">
            <TabsTrigger value="main">{`Form.${
              typescript ? "tsx" : "jsx"
            }`}</TabsTrigger>
            {!tailwindcss && (
              <TabsTrigger className="bg-background" value="css">
                CSS
              </TabsTrigger>
            )}
          </TabsList>
          <Button
            size={"icon"}
            variant={"outline"}
            onClick={handleCopy}
            style={{ marginBottom: "10px" }}
          >
            <Copy />
          </Button>
          {copySuccess && (
            <span
              className="absolute -right-16 top-2 font-semibold text-sm"
              style={{ color: "green" }}
            >
              Copied!
            </span>
          )}
        </div>
        <TabsContent value="main">
          <Highlight
            theme={theme == "light" ? themes.github : themes.nightOwl}
            code={codeBlock}
            language="tsx"
          >
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
        </TabsContent>
        {!tailwindcss && (
          <TabsContent value="css">
            <Highlight
              theme={theme == "light" ? themes.github : themes.nightOwl}
              code={cssBlock ? cssBlock : ""}
              language="css"
            >
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
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
