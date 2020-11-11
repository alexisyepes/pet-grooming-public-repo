const uuid = require("uuid/v1"); // ES5

module.exports = function (sequelize, DataTypes) {
	var User = sequelize.define("User", {
		id: {
			primaryKey: true,
			type: DataTypes.UUID,
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: true,
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				len: [1],
			},
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
			validate: {
				isEmail: true,
			},
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		jobType: {
			type: DataTypes.STRING,
			default: true,
			allowNull: false,
		},
	});

	User.beforeCreate((user, _) => {
		return (user.id = uuid());
	});

	return User;
};
