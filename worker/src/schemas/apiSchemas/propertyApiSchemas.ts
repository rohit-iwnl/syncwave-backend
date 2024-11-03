import { z } from 'zod';

const RoommateEnum = z.enum(['1', '2', '3', '4', '5', 'Custom']);
const BedroomEnum = z.enum(['1', '2', '3', '4+']);
const BathroomEnum = z.enum(['1', '2', '3', '4+']);
const FurnishingEnum = z.enum(['Fully Furnished', 'Semi Furnished']);

export const PropertyCreateSchema = z.object({
  supabase_id: z.string(),
  location: z.string(),
  monthly_base_rent: z.number().positive(),
  per_person_rent: z.number().positive(),
  square_footage: z.number().positive(),
  type: z.enum(['condo', 'duplex', 'apartment', 'studio']),
  bedrooms: BedroomEnum,
  bathrooms: BathroomEnum,
  preferred_roommates: RoommateEnum,
  furnishing: FurnishingEnum,
  amenities: z.array(z.string()),
  coordinates: z.object({
    latitude: z.number(),
    longitude: z.number()
  })
});

// Export the enums if you need to use them elsewhere
export const PropertyEnums = {
  RoommateEnum,
  BedroomEnum,
  BathroomEnum,
  FurnishingEnum
} as const;

// Type inference
export type PropertyCreate = z.infer<typeof PropertyCreateSchema>;

// If you need a schema that includes the description (after generation)
export const PropertyCompleteSchema = PropertyCreateSchema.extend({
  description: z.string()
});

export type PropertyComplete = z.infer<typeof PropertyCompleteSchema>;
