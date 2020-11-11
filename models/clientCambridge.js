const uuid = require("uuid/v1"); // ES5

module.exports = function (sequelize, DataTypes) {
  var ClientCambridge = sequelize.define(
    "ClientCambridge",
    {
      registrationNumber: {
        type: DataTypes.UUID,
        allowNull: true,
      },
      lastName: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1],
      },
      firstName: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1],
      },
      primaryPhoneNumber: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1],
      },
      cellphone: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1],
      },
      workPhone: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1],
      },
      email: {
        type: DataTypes.TEXT,
        allowNull: true,
        len: [1],
      },
    },

    {
      timestamps: false,
    }
  );

  ClientCambridge.beforeCreate((clientCambridge, _) => {
    return (clientCambridge.registrationNumber = uuid());
  });

  ClientCambridge.associate = function (models) {
    // Associating Clients with Pets
    // When a Client is deleted, also delete any associated Pets
    ClientCambridge.hasMany(models.PetCambridge, {
      onDelete: "cascade",
    });
  };

  return ClientCambridge;
};
