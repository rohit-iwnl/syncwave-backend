import { Hono } from "hono";
import { handleUserCreated, handleUserUpdated } from "@/utils/userSync";

const supabaseSyncRouter = new Hono();

supabaseSyncRouter.get("/", (c) => {
  return c.json({
    message: "Supabase sync route",
  });
});

supabaseSyncRouter.post("/sync/user", async (c) => {
  const body = await c.req.json();
  console.log(body);
  const { type, record } = body;


  switch (type) {
    case "INSERT":
      await handleUserCreated(record);
      break;
    case "UPDATE":
      await handleUserUpdated(record);
      break;
    default:
      return c.json({ error: `Unsupported webhook type: ${type}` }, 400);
  }

  return c.json({ success: true }, 200);
});

supabaseSyncRouter.post("/sync/user/view", async (c) => {
  const body = await c.req.json();
  const { type, record } = body;
  return c.json({
    type,
    record,
  });
});

export default supabaseSyncRouter;
