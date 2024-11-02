import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authenticateToken } from "@/middleware/auth";
import onboardingSchemas from "@/schemas/apiSchemas/onboardingSchemas";
import UserModel from "@/models/supabase/UserProfile";
import { checkIfUserExists } from "@/utils/userUtils";

const onboardingRouter = new Hono();

onboardingRouter.post(
  "/set-preferences",
  authenticateToken,
  zValidator("json", onboardingSchemas.setPreferences),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const { supabase_id, preferences } = body;

      const user = await checkIfUserExists(supabase_id);

      if (!user) {
        return c.json({
          message: "User not found",
        }, 404);
      }

      await UserModel.findOneAndUpdate(
        { supabase_id: supabase_id },
        {
          preferences: preferences,
        },
      );

      return c.json({
        message: "Preferences updated successfully",
      }, 200);
    } catch (error) {
      console.error("Error updating preferences:", error);
      return c.json({
        message: "Error updating preferences",
        error: error instanceof Error ? error.message : "Unknown error",
      }, 500);
    }
  },
);

onboardingRouter.post(
  "/set-personal-details",
  authenticateToken,
  zValidator("json", onboardingSchemas.setPersonalDetails),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const { supabase_id, personal_details } = body;

      const user = await checkIfUserExists(supabase_id);

      if (!user) {
        return c.json({
          message: "User not found",
        }, 404);
      }

      await UserModel.findOneAndUpdate(
        { supabase_id: supabase_id },
        { personal_details: personal_details },
      );

      return c.json({
        message: "Personal details updated successfully",
      }, 200);
    } catch (error) {
      console.error("Error updating personal details:", error);
      return c.json({
        message: "Error updating personal details",
        error: error instanceof Error ? error.message : "Unknown error",
      }, 500);
    }
  },
);

onboardingRouter.post(
  "/set-housing-preferences",
  authenticateToken,
  zValidator("json", onboardingSchemas.setHousingPreferences),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const { supabase_id, housing_preferences } = body;

      const user = await checkIfUserExists(supabase_id);

      if (!user) {
        return c.json({
          message: "User not found",
        }, 404);
      }

      await UserModel.findOneAndUpdate({
        supabase_id: supabase_id,
      }, {
        housing_preferences: housing_preferences,
      });

      return c.json({
        message: "Housing preferences updated successfully",
      }, 200);
    } catch (error) {
      console.error("Error updating housing preferences:", error);
      return c.json({
        message: "Error updating housing preferences",
        error: error instanceof Error ? error.message : "Unknown error",
      }, 500);
    }
  },
);

export default onboardingRouter;
