const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  //defino el modelo
  sequelize.define("Team",{
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
