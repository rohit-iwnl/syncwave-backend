module.exports = {
  apps: [{
    name: "syncwave-worker",
    script: "./src/index.ts",
    interpreter: "bun",
    env: {
      NODE_ENV: "production",
      PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`,
    },
    max_memory_restart: '1G',
    autorestart: true,
    exec_mode: 'fork',
    instances: 1,
    kill_timeout: 3000,
    wait_ready: true,
    watch: true,
    ignore_watch: [
      "node_modules",
      "logs",
      ".git",
      "*.log"
    ],
    watch_options: {
      followSymlinks: false,
      usePolling: true
    }
  }]
}
