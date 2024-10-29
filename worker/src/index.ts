import { Hono } from "hono";
import { logger } from "hono/logger";
import onboardingRouter from "./routes/onboardingRouter";
import onboardingRouteConstants from "./constants/routes/onboardingRouteConstants";
import connectDB from "@/db/db";

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
app.route(onboardingRouteConstants.BASE_PATH, onboardingRouter);


export default {
  port : 8000,
  hostname : "0.0.0.0",
  fetch : app.fetch
}
