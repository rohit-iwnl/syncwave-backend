FROM oven/bun:1.0.25 AS base
WORKDIR /usr/src/app

# Install dependencies
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb* /temp/dev/
WORKDIR /temp/dev
RUN bun install

# Copy dependencies and source code
FROM base AS release
COPY --from=install /temp/dev/node_modules node_modules
COPY . .

# Install Node.js and PM2
RUN apt-get update && \
    apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install pm2 -g && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

ENV PATH="/root/.bun/bin:/usr/local/bin:/usr/bin:${PATH}"
ENV NODE_PATH="/usr/local/lib/node_modules"
ENV NPM_CONFIG_PREFIX="/usr/local"

CMD ["pm2-runtime", "pm2.config.js"]
