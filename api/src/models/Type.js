const { DataTypes } = require("sequelize");

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
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
      // no se le pasa el id porq no estoy creando otro tipo de type aparte del que aparece en la base de datos.. con el id solito de pokemon ya alcanza

      name: {
        type: DataTypes.STRING,
      },
    },
    { timestamps: false }
  );
};
