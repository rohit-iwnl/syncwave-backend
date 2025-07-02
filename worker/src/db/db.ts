import { PrismaClient } from "@prisma/client";

declare global {
  var __prisma: PrismaClient | undefined;
}

// Singleton pattern for Prisma client
let prisma: PrismaClient;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__prisma) {
    global.__prisma = new PrismaClient({
      log: ["query", "error", "warn"],
    });
  }
  prisma = global.__prisma;
}

const connectDB = async () => {
  if (!process.env.DATABASE_URL) {
    throw new Error(
      "DATABASE_URL is not defined in the environment variables",
    );
  }

  console.log("Connecting to PostgreSQL...");

  try {
    await prisma.$connect();
    console.log("PostgreSQL connected successfully");

    // Test the connection
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection verified");
  } catch (error) {
    console.error("PostgreSQL connection error:", error);
    throw error;
  }
};

const disconnectDB = async () => {
  try {
    await prisma.$disconnect();
    console.log("PostgreSQL disconnected");
  } catch (error) {
    console.error("Error disconnecting from PostgreSQL:", error);
  }
};

// Export the Prisma client and connection functions
export { connectDB, disconnectDB, prisma as db };
export default prisma;
