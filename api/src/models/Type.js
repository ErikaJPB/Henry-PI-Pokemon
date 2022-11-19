const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.

/* Defining the model. */
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "Type",
    {
      // id: {
      //   type: DataTypes.UUID,
      //   primaryKey: true,
      //   defaultValue: DataTypes.UUIDV4,
      // },

      //We don't pass the id because we are not creating a new class of type, is the same type that appears at the API.

      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
