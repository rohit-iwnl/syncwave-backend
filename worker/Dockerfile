# Base image
FROM oven/bun:1.0.25 AS base
WORKDIR /usr/src/app

# Install dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Copy dependencies and source code
FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Debug directory contents
RUN echo "Directory contents:" && ls -la
RUN echo "Node Modules contents:" && ls -la node_modules

# Run the app
USER bun
EXPOSE 8000
CMD ["bun", "run", "dev"]
