FROM oven/bun:1.0.25

WORKDIR /app

# Copy package files
COPY package.json ./
COPY bun.lockb ./

# Clean install dependencies
RUN rm -rf node_modules
RUN bun install --frozen-lockfile

# Copy source code
COPY . .

# Debug directory contents
RUN echo "Node Modules Contents:" && ls -la node_modules

# Start the application
CMD ["bun", "run", "dev"]
