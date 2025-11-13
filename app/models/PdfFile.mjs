import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define(
    "PdfFile",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true },
      filename: { type: DataTypes.STRING(255), allowNull: false },
      path: { type: DataTypes.STRING(1000), allowNull: false },
      status: { type: DataTypes.STRING(50), defaultValue: "uploaded" },
      textPath: { type: DataTypes.STRING(1000) },
    },
    { tableName: "PDF_FILES", timestamps: true,         schema: "SYSTEM",      // 👈 add schema here
  freezeTableName: true }
  );
};
