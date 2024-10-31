import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authenticateToken } from "@/middleware/auth";
import onboardingSchemas from "@/schemas/apiSchemas/onboardingSchemas";
import UserModel from "@/models/supabase/UserProfile";

const onboardingRouter = new Hono();

onboardingRouter.post(
  "/set-preferences",
  authenticateToken,
  zValidator("json", onboardingSchemas.setPreferences),
  async (c) => {
    try {
      const body = c.req.valid("json");
      const { supabase_id, preferences } = body;

      // Change findById to findOne with supabase_id
      const user = await UserModel.findOne({ supabase_id: supabase_id });

      if (!user) {
        return c.json({
          message: "User not found",
        }, 404);
      }

      // Change findByIdAndUpdate to findOneAndUpdate with supabase_id
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

export default onboardingRouter;
