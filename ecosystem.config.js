module.exports = {
  apps: [
    {
      name: "node-oracle-crud",
      script: "./bootstrap/server.mjs",
      instances: "max",
      exec_mode: "cluster",
      watch: false,               // enable in dev if you want file-watch
      max_memory_restart: "700M",
      env: {
        NODE_ENV: "development",
        PORT: 3000
      },
      env_production: {
        NODE_ENV: "production",
        PORT: 8080
      },
      error_file: "./logs/err.log",
      out_file: "./logs/out.log",
      combine_logs: true,
      time: true
    }
  ]
}
