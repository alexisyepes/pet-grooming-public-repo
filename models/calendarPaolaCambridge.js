module.exports = function (sequelize, DataTypes) {
  var CalendarPaolaCambridge = sequelize.define("CalendarPaolaCambridge", {
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    lastModifiedBy: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        len: [1],
      },
    },
    appointment: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1],
    },
  });

  return CalendarPaolaCambridge;
};
