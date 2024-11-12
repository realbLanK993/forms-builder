"use client"
// import FormComponent from "@/abc";
import FormComponent from "@/def.jsx";
import Builder from "@/components/builder";
import CodeHighlight from "@/components/prettify-code";
// import Preview from "@/components/preview";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";

export default function Playground() {
  const [react, setReact] = useState(true);
  const [typescript, setTypescript] = useState(true);
  const [css, setCss] = useState(true);
  const [tailwind, setTailwind] = useState(true);
  const [shadcn, setShadcn] = useState(true);
  const [rhf, setRhf] = useState(true);

  useEffect(() => {
    if(!react && rhf){
      setReact(true);
    }
    if(!react && shadcn){
      setReact(true);
    }
    if(!shadcn && rhf){
      setShadcn(true);
    }
  }, [react, shadcn, rhf]);


  return (
    <main className="flex gap-4 flex-1 w-full h-full p-4">
      <Tabs defaultValue="form" className="w-full">
        <TabsList>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form" className="flex flex-col gap-4 py-2">
          <Card className="gap-4 flex flex-col p-4">
            <p className="font-bold">Tools</p>
            <div className="flex flex-row flex-wrap gap-4">
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={react}
                  // disabled={rhf || shadcn}
                  disabled
                  onCheckedChange={(checked) =>
                    setReact(checked ? true : false)
                  }
                  id="react"
                  defaultChecked
                />{" "}
                <Label htmlFor="react">React</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={typescript}
                  onCheckedChange={(checked) =>
                    setTypescript(checked ? true : false)
                  }
                  id="typescript"
                  defaultChecked
                />{" "}
                <Label htmlFor="typescript">Typescript</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={css}
                  disabled
                  onCheckedChange={(checked) => setCss(checked ? true : false)}
                  id="css"
                  defaultChecked
                />{" "}
                <Label htmlFor="css">CSS</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={tailwind}
                  onCheckedChange={(checked) =>
                    setTailwind(checked ? true : false)
                  }
                  id="tailwind"
                  defaultChecked
                />{" "}
                <Label htmlFor="tailwind">TailwindCSS</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={shadcn}
                  disabled={rhf}
                  onCheckedChange={(checked) =>
                    setShadcn(checked ? true : false)
                  }
                  id="shadcn"
                  defaultChecked
                />{" "}
                <Label htmlFor="shadcn">shadCN</Label>
              </div>
              <div className="flex gap-2 items-center">
                <Checkbox
                  checked={rhf}
                  onCheckedChange={(checked) => setRhf(checked ? true : false)}
                  id="rhf"
                  defaultChecked
                />{" "}
                <Label htmlFor="rhf">React Hook Form</Label>
              </div>
            </div>
          </Card>{" "}
          <Builder />
        </TabsContent>
        <TabsContent value="code">
          <CodeHighlight
            react={react}
            typescript={typescript}
            css={css}
            tailwindcss={tailwind}
            shadcn={shadcn}
            rhf={rhf}
          />
        </TabsContent>
        <TabsContent value="preview">
          <FormComponent />
        </TabsContent>
      </Tabs>
    </main>
  );
}
