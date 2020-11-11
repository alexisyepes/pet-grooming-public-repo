const express = require("express");
const router = express.Router();
const CommissionDiana = require("../../models").CommissionDiana;

router.get("/commission/diana/:todayDate", (req, res) => {
	CommissionDiana.findAll({
		where: {
			date: req.params.todayDate,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission);
	});
});

router.get("/commission/diana/:day", (req, res) => {
	CommissionDiana.findAll({
		where: {
			date: req.params.day,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission).catch((err) => res.json(err));
	});
});

router.get("/commission/dianas/:id", (req, res) => {
	CommissionDiana.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommission) => res.json(dbCommission))
		.catch((err) => res.json(err));
});

router.post("/commission/diana", (req, res) => {
	CommissionDiana.create({
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
router.put("/commission/diana/:id", (req, res) => {
	CommissionDiana.update(
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
router.delete("/commission/diana/:id", function (req, res) {
	CommissionDiana.destroy({
		where: {
			id: req.params.id,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission);
	});
});

module.exports = router;
