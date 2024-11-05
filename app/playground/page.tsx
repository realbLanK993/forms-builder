import FormComponent from "@/abc";
import Builder from "@/components/builder";
import CodeHighlight from "@/components/prettify-code";
import Preview from "@/components/preview";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Playground() {
  return (
    <main className="flex gap-4 flex-1 w-full h-full p-4">
      <Tabs defaultValue="form" className="w-full">
        <TabsList>
          <TabsTrigger value="form">Form</TabsTrigger>
          <TabsTrigger value="code">Code</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>
        <TabsContent value="form"> <Builder /></TabsContent>
        <TabsContent value="code"><CodeHighlight /></TabsContent>
        <TabsContent value="preview">
          <FormComponent />
        </TabsContent>
      </Tabs>
    </main>
     
  );
}
