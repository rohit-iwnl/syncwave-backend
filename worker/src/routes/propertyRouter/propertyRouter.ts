import { Hono } from "hono";
import OpenAI from "openai";
import {
  PropertyCompleteSchema,
  PropertyCreateSchema,
} from "../../schemas/apiSchemas/propertyApiSchemas";
import { PropertyModel } from "../../models/property/PropertyModel";
import { zValidator } from "@hono/zod-validator";

const property = new Hono();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

property.post(
  "/generate-description",
  zValidator("json", PropertyCreateSchema),
  async (c) => {
    try {
      const propertyData = c.req.valid("json");

      // Construct the prompt for GPT
      const prompt =
        `Generate a compelling property listing description for a ${propertyData.type} with the following details:
    - ${propertyData.bedrooms} bedroom(s)
    - ${propertyData.bathrooms} bathroom(s)
    - ${propertyData.square_footage} square feet
    - Monthly rent: $${propertyData.monthly_base_rent}
    - Per person rent: $${propertyData.per_person_rent}
    - Location: ${propertyData.location}
    - Furnishing: ${propertyData.furnishing}
    - Amenities: ${propertyData.amenities}
    - Looking for ${propertyData.preferred_roommates} roommate(s)

    Write a natural, engaging description that highlights these features. Keep it concise but informative within 350 characters. Also write it like a student
    is writing a description for a roommate posting on a college website. keep it very casual and friendly. Look around the property and describe it like a human would.
    with benefits like stores nearby, public transport, and other benefits.`;

      // Generate description using GPT
      const completion = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-4o-mini",
      });

      const generatedDescription = completion.choices[0].message.content;

      // Combine the original data with the generated description
      const completeProperty = PropertyCompleteSchema.parse({
        ...propertyData,
        description: generatedDescription,
      });

      // Save to MongoDB
      const property = await PropertyModel.create(completeProperty);

      return c.json({
        id: property._id,
        description: generatedDescription,
      }, 201);
    } catch (error) {
      console.error("Error generating property description:", error);
      return c.json({
        success: false,
        error: error instanceof Error
          ? error.message
          : "Unknown error occurred",
      }, 400);
    }
  },
);

export default property;
