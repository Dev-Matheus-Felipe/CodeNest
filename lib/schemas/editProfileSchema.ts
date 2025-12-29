import z4 from "zod/v4";

const nameRegex =
/^[\p{L}\p{M}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+([\s'-][\p{L}\p{M}\p{Script=Han}\p{Script=Hiragana}\p{Script=Katakana}\p{Script=Hangul}]+)*$/u;

const usernameRegex =
/^[a-z][a-z0-9]{2,19}(-[a-z0-9]+)*$/;

export const editProfileSchema = z4.object({
  name: z4
    .string("Not a string")
    .min(3, "Min Length: 3")
    .max(20, "Max Length: 20")
    .regex(nameRegex, "Name Invalid"),

  username: z4
    .string("Not a string")
    .regex(usernameRegex, "Username Invalid"),

  bio: z4
    .string("Not a string")
    .max(255, "Max Length: 255")
    .transform(v => v.normalize("NFC"))
    .optional(),

  portfolio: z4
    .union([z4.string().url("Invalid URL"), z4.literal("")])
    .optional(),
});

export type EditProfileSchemaType = z4.infer<typeof editProfileSchema>;
