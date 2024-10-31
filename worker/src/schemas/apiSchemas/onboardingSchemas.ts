import { z } from "zod";

const onboardingSchemas = Object.freeze({
    createUser: z.object({
        username: z.string().min(4),
    }),
    setPreferences: z.object({
        supabase_id: z.string().uuid(),
        preferences: z.object({
            find_roommate: z.boolean(),
            here_to_explore: z.boolean(),
            sell_buy_product: z.boolean(),
            lease_property: z.boolean(),
        }),
    }),
});

export default onboardingSchemas;
