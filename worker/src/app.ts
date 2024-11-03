import { Hono } from "hono";
import { logger } from "hono/logger";
import onboardingRouter from "./routes/onboardingRouter";
import onboardingRouteConstants from "./constants/routes/onboardingRouteConstants";
import supabaseRouteConstants from "@/constants/routes/supabaseRouteConstants";
import propertyRouteConstants from "@/constants/routes/propertyRouteConstants";
import { connectDB } from "@/db/db";
import { authenticateToken } from "./middleware/auth";
import supabaseSyncRouter from "./routes/supbaseSyncRouter";
import propertyRouter from "@/routes/propertyRouter/propertyRouter";

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

app.get("/", authenticateToken, (c) => {
  return c.json({
    message: "Server is up and serving"
  })
})

app.route(onboardingRouteConstants.BASE_PATH, onboardingRouter);
app.route(supabaseRouteConstants.BASE_PATH, supabaseSyncRouter);
app.route(propertyRouteConstants.BASE_PATH, propertyRouter);
export default app;
