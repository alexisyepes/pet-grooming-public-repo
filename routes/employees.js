const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models").User;

// DELETE route for employees.
router.delete(
	"/employees/:id",
	passport.authenticate("jwt", {
		session: false,
	}),
	function (req, res) {
		User.destroy({
			where: {
				id: req.params.id,
			},
		}).then(function (dbEmployee) {
			res.json(dbEmployee);
		});
	}
);

module.exports = router;
