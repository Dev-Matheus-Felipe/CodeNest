import z4 from "zod/v4";

export const responseSchema = z4.object({
  content: z4
    .string()
    .min(5, "Min Length: 5")
    .max(250, "Max Length: 250")
    .refine(
      v => !/<\/?[a-z][\s\S]*?>/i.test(v),
      "HTML or script tags are not allowed"
    )
    .transform(v => v.normalize("NFC")),

  language: z4.string(),

  code: z4
    .string()
    .max(10_000, "Character limits reached")
    .optional(),
});

export type ResponseSchemaType = z4.infer<typeof responseSchema>;
