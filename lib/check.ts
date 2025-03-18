import prettier from "prettier";

export async function generateReactShadcn(name:string, label:string, type:string, placeholder?:string, required?:boolean) {
    const raw = `<Form.Field name="${name}"><Form.Label>${label}</Form.Label><Form.Control asChild><Input type="${type}" placeholder="${placeholder || ''}" ${required ? "required" : ""} /></Form.Control></Form.Field>`;
    return await prettier.format(raw, { parser: "jsx", printWidth: 80 })
}
