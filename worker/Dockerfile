FROM oven/bun:latest

WORKDIR /app

# Copy package files
COPY package*.json bun.lockb ./

# Install dependencies
RUN bun install

# Copy source code
COPY . .

# Expose the port your app runs on
EXPOSE 8000

# Start the application
CMD ["bun", "run", "dev"]
