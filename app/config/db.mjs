import { Sequelize } from "sequelize";
import oracledb from "oracledb";
import dotenv from "dotenv";
dotenv.config();

const {
  DB_USER,
  DB_PASS,
  DB_NAME,
  DB_HOST,
  DB_PORT,
  DB_CONNECT_STRING,
} = process.env;

// optional: node-oracledb thin mode (no instant client) available in recent versions
// oracledb.initOracleClient({ libDir: process.env.ORACLE_LIB_DIR }); // if using instant client

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASS, {
  dialect: "oracle",
  dialectModule: oracledb,
  dialectOptions: {
    // use connectString if you want
    connectString: DB_CONNECT_STRING || `${DB_HOST}:${DB_PORT}/${DB_NAME}`,
    // additional oracledb options can go here
  },
  pool: {
    max: 10,      // threadpooling / concurrency tuning
    min: 2,
    acquire: 60000,
    idle: 10000,
  },
  logging: false, // set to console.log for debugging
});

// test connection
export async function testConnection() {
  try {
    await sequelize.authenticate();
   // await sequelize.sync({ alter: false, force: false });
    console.log("✅ Sequelize connected to Oracle");
  } catch (err) {
    console.error("❌ Unable to connect to Oracle:", err);
    throw err;
  }
}
