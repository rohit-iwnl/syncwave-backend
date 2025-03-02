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

  // Set user housing preferences (Housing Preferences View)
  setHousingPreferences: z.object({
    supabase_id: z.string().uuid(),
    housing_preferences: z.object({
      property_types: z.array(
        z.enum(["condo", "duplex", "apartment", "studio"]),
      ),
      rent_range: z.object({
        min: z.number().min(200).max(4000),
        max: z.number().min(200).max(4000),
      }),
      property_size: z.object({
        min: z.number().min(500).max(3000),
        max: z.number().min(500).max(3000),
      }),
      bedrooms: z.array(z.enum(["1", "2", "3", "4+", "any"])),
      bathrooms: z.array(z.enum(["1", "2", "3", "4+", "any"])),
      preferred_roommates: z.array(z.enum(["1", "2", "3", "4+", "any"])),
      furnishing: z.array(z.enum(["fully furnished", "any", "semi furnished"])),
      amenities: z.array(z.string()),
    }),
  }),

  // set user's find roomate preferences (This is from the onboarding view)
  setFindRoomPreferences: z.object({
    supabase_id: z.string().uuid(),
    find_room_preferences: z.object({
      need_room: z.boolean().optional(),
      need_roommate: z.boolean().optional(),
      looking_for_both: z.boolean().optional(),
    }),
  }),

  setNewPropertyAdSchema: z.object({
    supabase_id: z.string().uuid(),
    property_details : z.object({
      property_types: z.array(
        z.enum(["condo", "duplex", "apartment", "studio"]),
      ),
      total_rent : z.number(),
      rent_per_person: z.number(),
      start_date : z.date(),
      end_date : z.date().optional(),
      location: z.object({
        city: z.string(),
        state: z.string(),
        country: z.string(),
        zip_code: z.string(),
        latitude: z.number(),
        longitude: z.number(),
      }),
      people_per_unit: z.number(),
      property_size: z.object({
        min: z.number().min(500).max(3000),
        max: z.number().min(500).max(3000),
      }),
      bedrooms: z.array(z.enum(["1", "2", "3", "4+", "any"])),
      bathrooms: z.array(z.enum(["1", "2", "3", "4+", "any"])),
      preferred_roommates: z.array(z.enum(["1", "2", "3", "4+", "any"])),
      furnishing: z.array(z.enum(["fully furnished", "any", "semi furnished"])),
      amenities: z.array(z.string()),
    })
  }),

});

export default onboardingSchemas;
