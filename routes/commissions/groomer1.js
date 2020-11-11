const express = require("express");
const router = express.Router();
const CommissionGroomer1 = require("../../models").CommissionGroomer1;

router.get("/commission/groomer1/:todayDate", (req, res) => {
	CommissionGroomer1.findAll({
		where: {
			date: req.params.todayDate,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission);
	});
});

router.get("/commission/groomer1/:day", (req, res) => {
	CommissionGroomer1.findAll({
		where: {
			date: req.params.day,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission).catch((err) => res.json(err));
	});
});

router.get("/commission/groomer1s/:id", (req, res) => {
	CommissionGroomer1.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommission) => {
			res.json(dbCommission);
		})
		.catch((err) => res.json(err));
});

router.post("/commission/groomer1", (req, res) => {
	CommissionGroomer1.create({
		...req.body,
	})
		.then(function (dbCommission) {
			res.json(dbCommission);
		})
		.catch(function (err) {
			res.json(err);
		});
});

// PUT route for updating one commission.
router.put("/commission/groomer1/:id", (req, res) => {
	CommissionGroomer1.update(
		{
			...req.body,
		},
		{
			where: {
				id: req.params.id,
			},
		}
	)
		.then(function (dbCommission) {
			res.json(dbCommission);
		})
		.catch(function (err) {
			res.json(err);
		});
});

// DELETE route for commission
router.delete("/commission/groomer1/:id", function (req, res) {
	CommissionGroomer1.destroy({
		where: {
			id: req.params.id,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission);
	});
});

module.exports = router;
