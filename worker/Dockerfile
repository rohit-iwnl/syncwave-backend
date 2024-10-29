FROM oven/bun:1.0.25

WORKDIR /app

# Copy package files
COPY package.json bun.lockb ./

# Install dependencies
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# List contents to debug
RUN ls -la
RUN ls -la src/

# Keep container running for debugging
CMD ["sh", "-c", "ls -la && echo 'Directory contents above' && bun run dev"]
