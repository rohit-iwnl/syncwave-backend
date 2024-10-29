import connectDB from "@/db/db";

const server = {
  port: 8000,
  fetch: async (request: Request) => {
    try {
      // Test DB connection
      await connectDB();
      
      return new Response(JSON.stringify({ 
        message: "Server is running and DB is connected!" 
      }), {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      });
    } catch (error) {
      console.error('Server error:', error);
      return new Response(JSON.stringify({ 
        error: "Server error",
        details: error instanceof Error ? error.message : "Unknown error"
      }), {
        status: 500,
        headers: {
          "Content-Type": "application/json"
        }
      });
    }
  }
};

export default server;
