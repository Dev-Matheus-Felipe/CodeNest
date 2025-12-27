import z4 from "zod/v4";

export const editProfileSchema = z4.object({
    name: z4.string("Not a string")
        .min(3, "Min Length: 3")
        .max(20,"Max Length: 20")
        .regex(/^[a-zA-Z0-9]+( [a-zA-Z0-9]+)*$/, "Name Invalidated"),

    username: z4
        .string("Not a string")
        .min(3, "Min Length: 3")
        .max(20,"Max Length: 20")
        .regex(/^[a-z][a-z0-9]*(-[a-z0-9]+)*$/,"Username Invalidated"),
    
    bio: z4
        .string("Not a string")
        .max(255, "Max Length: 255")
        .optional(),
    
    portfolio: z4.string().url("Not a Http url").nullable().optional()

});

export type EditProfileSchemaType = z4.infer<typeof editProfileSchema>;   