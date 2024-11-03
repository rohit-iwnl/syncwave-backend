import { Hono } from "hono";
import OpenAI from "openai";
import {
  PropertyGenerateDescriptionSchema,
} from "../../schemas/apiSchemas/propertyApiSchemas";
import { zValidator } from "@hono/zod-validator";
import { z } from "zod";

const property = new Hono();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const PropertyDescriptionSchema = z.object({
  description: z.string().max(350),
});

property.post(
  "/generate-description",
  zValidator("json", PropertyGenerateDescriptionSchema),
  async (c) => {
    try {
      const propertyData = c.req.valid("json");

      const { property, supabase_id } = propertyData;

      const completion = await openai.chat.completions.create({
        messages: [
          {
            role: "user",
            content:
              `Generate a compelling property listing description for a ${property.type} with the following details:
              - ${property.bedrooms} bedroom(s)
              - ${property.bathrooms} bathroom(s)
              - ${property.square_footage} square feet
              - Monthly rent: $${property.monthly_base_rent}
              - Per person rent: $${property.per_person_rent}
              - Location: ${property.location}
              - Furnishing: ${property.furnishing}
              - Amenities: ${property.amenities}
              - Preferrably looking for ${property.preferred_roommates} to live with.`,
          },
        ],
        model: "gpt-4o-mini-2024-07-18",
        functions: [
          {
            name: "generate_property_description",
            description:
              "Generate a structured property description for a student housing listing. You dont have to include all the details, just the most important ones.",
            parameters: {
              type: "object",
              properties: {
                description: {
                  type: "string",
                  description:
                    "A casual, friendly description written from a student's perspective trying to get roommates to live with them. Please do not sound like a leasing agent or a realtor and keep it short and concise, maximum 350 characters",
                },
              },
              required: ["description"],
            },
          },
        ],
        function_call: { name: "generate_property_description" },
      });

      // Check if function call exists
      if (!completion.choices[0].message.function_call) {
        return c.json({
          success: false,
          error: "No function call in OpenAI response",
          code: "OPENAI_NO_FUNCTION_CALL"
        }, 400);
      }

      // Parse the function call arguments
      let functionArgs;
      try {
        functionArgs = JSON.parse(completion.choices[0].message.function_call.arguments);
      } catch (parseError) {
        return c.json({
          success: false,
          error: "Failed to parse OpenAI response",
          code: "INVALID_RESPONSE_FORMAT"
        }, 400);
      }

      // Validate the parsed result
      const validationResult = PropertyDescriptionSchema.safeParse(functionArgs);
      if (!validationResult.success) {
        return c.json({
          success: false,
          error: "Invalid description format in OpenAI response",
          code: "INVALID_DESCRIPTION_FORMAT",
          details: validationResult.error.errors
        }, 400);
      }
      
      return c.json(validationResult.data, 201);
    } catch (error) {
      console.error("Error generating property description:", error);
      
      if (error instanceof OpenAI.APIError) {
        return c.json({
          success: false,
          error: "OpenAI API error",
          code: "OPENAI_API_ERROR",
          details: error.message
        }, 500);
      }

      return c.json({
        success: false,
        error: "Internal server error",
        code: "INTERNAL_SERVER_ERROR",
        details: error instanceof Error ? error.message : "Unknown error occurred"
      }, 500);
    }
  },
);

export default property;
