import { z } from "zod";

const PersonalTraitSchemas = Object.freeze({
    storeUserTraits: z.object({
        supabase_id: z.string().uuid(),
        basicInfo: z.object({
            preferred_age_range: z.string().refine((value) => {
                const ageRangePattern = /^(any|\d{1,2}-\d{1,2})$/;
                return ageRangePattern.test(value);
            }, {
                message:
                    "Age range must be in the format 'min-max' (e.g., '18-22')",
            }),

            preferred_gender: z.enum(["male", "female", "any"]),
            smoking_preference: z.enum(["yes", "no", "occasionally"]),
            drinking_preference: z.enum(["yes", "no", "occasionally"]),
            noise_tolerance: z.enum(["quiet", "regular", "moderate", "loud"]),
            cleanliness: z.enum(["tidy", "weekend clean", "casual", "messy"]),
            food_preference: z.enum(["veg", "non-veg", "any"]),
        }),
        interests: z.array(z.string()),
    }),
});

export default PersonalTraitSchemas;
