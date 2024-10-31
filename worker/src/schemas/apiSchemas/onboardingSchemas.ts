import { z } from "zod";

const onboardingSchemas = Object.freeze({
    createUser: z.object({
        username: z.string().min(4),
    }),


    // Set user preferences (Options View)
    setPreferences: z.object({
        supabase_id: z.string().uuid(),
        preferences: z.object({
            find_roommate: z.boolean(),
            here_to_explore: z.boolean(),
            sell_buy_product: z.boolean(),
            lease_property: z.boolean(),
        }),
    }),

    // Set user personal details (Personal Details View)
    setPersonalDetails: z.object({
        supabase_id: z.string().uuid(),
        personal_details: z.object({
            country: z.string(),
            state: z.string(),
            gender: z.string().optional(),
            field: z.string(),
            pronouns: z.string(),
        }),
    }),
});

export default onboardingSchemas;
