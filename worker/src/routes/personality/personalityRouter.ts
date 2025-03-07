
import { Hono } from "hono";
import { zValidator } from "@hono/zod-validator";
import { authenticateToken } from "@/middleware/auth";
import PersonalTraitSchemas from "@/schemas/personality/personalTraitsSchema";


const personalityRouter = new Hono();
 
personalityRouter.get("/", authenticateToken, async (c) => {
    return c.json({
        message: "ok"
    })
})


export default personalityRouter;