const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {

  sequelize.define(
    "Driver",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      forename: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      surname: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },

      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nationality: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      dob: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      
    },
    {
      timestamps: false,
    }
  );
};
