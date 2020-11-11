module.exports = function (sequelize, DataTypes) {
  var CommentCambridge = sequelize.define(
    "CommentCambridge",
    {
      date: {
        type: DataTypes.DATEONLY,
        allowNull: true,
      },
      comment: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      groomer: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );

  CommentCambridge.associate = function (models) {
    CommentCambridge.belongsTo(models.PetCambridge);
    onDelete = "CASCADE";
  };

  return CommentCambridge;
};
