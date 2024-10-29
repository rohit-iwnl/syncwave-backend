import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import onboardingSchemas from "@/schemas/apiSchemas/onboardingSchemas";
import { z } from "zod";
import { User } from "@/models/User";

const onboardingRouter = new Hono();

const createUser = z.object({
  name: z.string().min(4),
});

onboardingRouter.post(
  "/create-user",
  zValidator("json", createUser),
  async (c) => {
    try {
      const data = c.req.valid("json");

      if (await User.findOne({ name: data.name })) {
        return c.json(
          {
            message: `User ${data.name} already exists`,
          },
          400
        );
      }

      // Create new user in database
      const user = new User({
        name: data.name,
      });

      await user.save();

      return c.json(
        {
          message: `User ${data.name} created successfully`,
        },
        201
      );
    } catch (error) {
      console.error("Error creating user:", error);
      return c.json(
        {
          message: "Error creating user",
          error: error instanceof Error ? error.message : "Unknown error",
        },
        500
      );
    }
  }
);

export default onboardingRouter;
