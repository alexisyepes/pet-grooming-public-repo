const express = require("express");
const router = express.Router();
const CommissionClaudia = require("../../models").CommissionClaudia;

router.get("/commission/claudia/:todayDate", (req, res) => {
	CommissionClaudia.findAll({
		where: {
			date: req.params.todayDate,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission);
	});
});

router.get("/commission/claudia", (req, res) => {
	CommissionClaudia.findAll({}).then(function (dbCommission) {
		res.json(dbCommission).catch((err) => res.json(err));
	});
});

router.get("/commission/claudia/:day", (req, res) => {
	CommissionClaudia.findAll({
		where: {
			date: req.params.day,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission).catch((err) => res.json(err));
	});
});

router.get("/commission/claudias/:id", (req, res) => {
	CommissionClaudia.findOne({
		where: {
			id: req.params.id,
		},
	})
		.then((dbCommission) => res.json(dbCommission))
		.catch((err) => res.json(err));
});

router.post("/commission/claudia", (req, res) => {
	CommissionClaudia.create({
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
router.put("/commission/claudia/:id", (req, res) => {
	CommissionClaudia.update(
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
router.delete("/commission/claudia/:id", function (req, res) {
	CommissionClaudia.destroy({
		where: {
			id: req.params.id,
		},
	}).then(function (dbCommission) {
		res.json(dbCommission);
	});
});

module.exports = router;
