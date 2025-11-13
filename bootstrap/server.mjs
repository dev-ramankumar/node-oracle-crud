import "dotenv/config";
import app from "../app/app.mjs";
import { testConnection, sequelize } from "../app/config/db.mjs";
import { logger } from "../app/utils/logger.mjs";

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await testConnection();
    // sync models in development only; in prod use migrations
    if (process.env.NODE_ENV !== "production") {
      await sequelize.sync({ alter: false }); // use alter cautiously
     // logger.info("Models synchronized");
    }

    app.listen(PORT, () => {
      logger.info(`Server started at http://localhost:${PORT}`);
    });
  } catch (err) {
    logger.error("Startup error: " + err.message);
    process.exit(1);
  }
}

start();
