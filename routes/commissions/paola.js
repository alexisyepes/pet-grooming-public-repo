const express = require("express");
const router = express.Router();
const CommissionPaola = require("../../models").CommissionPaola;

router.get("/commission/paola/:todayDate", (req, res) => {
	CommissionPaola.findAll({
		where: {
			date: req.params.todayDate,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission);
	});
});

router.get("/commission/paola/:day", (req, res) => {
	CommissionPaola.findAll({
		where: {
			date: req.params.day,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission).catch((err) => res.json(err));
	});
});

router.get("/commission/paolas/:id", (req, res) => {
	CommissionPaola.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommission) => res.json(dbCommission))
		.catch((err) => res.json(err));
});

router.post("/commission/paola", (req, res) => {
	CommissionPaola.create({
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
router.put("/commission/paola/:id", (req, res) => {
	CommissionPaola.update(
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
router.delete("/commission/paola/:id", function (req, res) {
	CommissionPaola.destroy({
		where: {
			id: req.params.id,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission);
	});
});

module.exports = router;
