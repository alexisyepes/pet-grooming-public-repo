module.exports = function (sequelize, DataTypes) {
  var Gallery = sequelize.define(
    "Gallery",
    {
      url: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1],
      },
    },
    {
      timestamps: false,
    }
  );

  return Gallery;
};
