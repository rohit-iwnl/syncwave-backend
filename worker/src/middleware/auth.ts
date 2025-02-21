import { bearerAuth } from 'hono/bearer-auth'

const SECRET_TOKEN = process.env.BEARER_TOKEN;

if (!SECRET_TOKEN) {
  throw new Error("BEARER_TOKEN is not set");
}

export const authenticateToken = bearerAuth({ token: SECRET_TOKEN });