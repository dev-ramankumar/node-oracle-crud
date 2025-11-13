import { sequelize } from "../config/db.mjs";
import UserModel from "./User.mjs";
import PdfFileModel from "./PdfFile.mjs";

// init models
const User = UserModel(sequelize);
const PdfFile = 2;

// Add associations if needed
// e.g., User.hasMany(PdfFile); PdfFile.belongsTo(User);

export { sequelize, User, PdfFile };
