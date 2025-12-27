import z4 from "zod/v4";

export const responseSchema = z4.object({
    content: z4.string().min(5,"Min Length:5 ").max(250,"Max Length: 250").regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*/),
    language: z4.string(),
    code: z4.string().max(10000,"Caracter limits reached").optional(),
})

export type ResponseSchemaType = z4.infer<typeof responseSchema>;