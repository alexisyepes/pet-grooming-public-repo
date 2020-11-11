module.exports = function (sequelize, DataTypes) {
	var CommissionGroomer1 = sequelize.define(
		"CommissionGroomer1",
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

	return CommissionGroomer1;
};
