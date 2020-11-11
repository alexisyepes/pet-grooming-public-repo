module.exports = function (sequelize, DataTypes) {
	var CommissionClaudia = sequelize.define(
		"CommissionClaudia",
		{
			date: {
				type: DataTypes.TEXT,
				allowNull: false,
				len: [1],
			},
			clientNumber: {
				type: DataTypes.TEXT,
				allowNull: false,
				len: [1],
			},
			nameBreed: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			cost: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			arrivalTime: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			pickupTime: {
				type: DataTypes.TEXT,
				allowNull: false,
			},
			tip: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			called: {
				type: DataTypes.BOOLEAN,
				allowNull: true,
			},
		},
		{
			timestamps: false,
		}
	);

	return CommissionClaudia;
};
