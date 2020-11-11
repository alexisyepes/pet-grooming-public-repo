module.exports = function (sequelize, DataTypes) {
  var PetCambridge = sequelize.define(
    "PetCambridge",
    {
      name: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1],
      },
      breed: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1],
      },
      type: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      petImg: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      notes: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      allowPhoto: {
        type: DataTypes.BOOLEAN,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  PetCambridge.associate = function (models) {
    PetCambridge.belongsTo(models.ClientCambridge);
    PetCambridge.hasMany(models.CommentCambridge, {
      onDelete: "cascade",
    });
  };

  return PetCambridge;
};
