import { Hono } from "hono";
import { logger } from "hono/logger";
import onboardingRouter from "./routes/onboardingRouter";
import onboardingRouteConstants from "./constants/routes/onboardingRouteConstants";
import { connectDB } from "@/db/db";
import { authenticateToken } from "./middleware/auth";
import supabaseSyncRouter from "./routes/supabaseSync";

const app = new Hono();

// Initialize DB connection
(async () => {
    try {
        await connectDB();
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        // Continue running the app, but MongoDB features won't work
    }
})();

app.use("*", logger());

app.get("/" , authenticateToken, (c) => {
    return c.json({
        message : "Server is up and serving"
    })
})

app.route(onboardingRouteConstants.BASE_PATH, onboardingRouter);
app.route("/api/supabase", supabaseSyncRouter);

export default app;