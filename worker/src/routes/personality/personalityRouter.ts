import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authenticateToken } from "@/middleware/auth";
import PersonalTraitSchemas from "@/schemas/personality/personalTraitsSchema";
import { checkIfUserExists } from "@/utils/userUtils";
import errorMessages from "@/constants/errors/errorsConstants";
import statusCodes from "@/constants/status-codes/status-code-constants";
import UserTraits from "@/models/user_personal_traits/UserTraits";

const personalityRouter = new Hono();

personalityRouter.post(
    "/",
    authenticateToken,
    zValidator("json", PersonalTraitSchemas.storeUserTraits),
    async (c) => {
        try {
            const body = c.req.valid("json");
            const { supabase_id } = body;

            const user = await checkIfUserExists(supabase_id);

            const {
                basicInfo,
                interests,
            } = body;

            if (!user) {
                return c.json({
                    success: false,
                    message: errorMessages.USER.NOT_FOUND,
                }, statusCodes.NOT_FOUND);
            }

            const check = await UserTraits.findOne({ supabase_id });

            if (check) {
                await UserTraits.findOneAndUpdate(
                    { supabase_id },
                    {
                        basicInfo,
                        interests,
                    },
                );
                return c.json({
                    success: true,
                    message: "Personal traits updated successfully",
                }, statusCodes.OK);
            } else {
                const newTrait = new UserTraits({
                    supabase_id,
                    basicInfo,
                    interests,
                });
                await newTrait.save();
                return c.json({
                    success: true,
                    message: "Personal traits stored successfully",
                }, statusCodes.OK);
            }
        } catch (error) {
            console.error(error);
            return c.json({
                success: false,
                error: error instanceof Error ? error.message : "Unknown error",
            }, statusCodes.INTERNAL_SERVER_ERROR);
        }
    },
);

export default personalityRouter;
