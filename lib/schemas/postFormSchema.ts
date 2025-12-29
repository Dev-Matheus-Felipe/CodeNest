import z4 from "zod/v4";

export const postFormType = z4.object({
  title: z4
    .string()
    .min(5, "Min Length: 5")
    .max(90, "Max Length: 90")
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

  tagsSelected: z4
    .array(z4.string())
    .min(1, "Min 1 tag")
    .max(3, "Max 3 tags are allowed"),

  description: z4
    .string()
    .min(5, "Min Length: 5")
    .max(200, "Max Length: 200")
    .refine(
      v => !/<\/?[a-z][\s\S]*?>/i.test(v),
      "HTML or script tags are not allowed"
    )
    .transform(v => v.normalize("NFC")),
});

export type PostFormType = z4.infer<typeof postFormType>;
