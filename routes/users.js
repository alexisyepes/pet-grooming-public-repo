const express = require("express");
const router = express.Router();
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = require("../models").User;
const salt = bcrypt.genSaltSync(10);
const jwt = require("jsonwebtoken");

// Register
router.post(
  "/signup",
  // passport.authenticate("jwt", {
  //   session: false,
  // }),
  (req, res) => {
    console.log(req.body);

    const {
      firstName,
      lastName,
      username,
      email,
      password,
      jobType,
    } = req.body;

    if (password.length < 6) {
      throw "Password must be at least 6 characters";
    } else {
      User.findOne({
        where: {
          email,
        },
      }).then((user) => {
        if (user) {
          res.send("Email already exists!");
        } else {
          const encryptedPassword = bcrypt.hashSync(password, salt);

          let newUser = {
            firstName,
            lastName,
            username,
            email,
            password: encryptedPassword,
            jobType,
          };
          User.create(newUser)
            .then(() => {
              // newUser.isAdmin = true
              delete newUser.password;
              res.send(newUser);
            })
            .catch(function (err) {
              console.log(err);
              res.json(err);
            });
        }
      });
    }
  }
);

// Login Admin
router.post("/login", function (req, res, next) {
  const { email, password } = req.body;
  // generate the authenticate method and pass the req/res
  passport.authenticate("admin-local", function (err, user, info) {
    if (!email || !password) {
      return;
    }
    if (err) {
      return res.status(401).json(err);
    }
    if (!user) {
      return res.status(401).json(info);
    }
    // req / res held in closure
    req.logIn(user, () => {
      User.findOne({
        where: {
          email: req.body.email,
        },
      }).then((user) => {
        const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
          expiresIn: "8760h",
        });
        res.status(200).send({
          // auth: true,
          token,
          jobType: user.jobType,
          username: user.username,
        });
      });
    });
  })(req, res, next);
});

// Logout Cutomer Admin
router.post("/logout", function (req, res) {
  const { emailLogout, password } = req.body;
  User.findOne({
    where: {
      email: emailLogout,
    },
  }).then((user) => {
    console.log(user);
    if (!user || !user.password) {
      res.status(400);

      return res.send({
        message:
          "No user found under those credentials, Only staff is allowed in this section",
      });
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) throw err;
      if (
        (isMatch && user.jobType === "customer") ||
        user.jobType === "admin"
      ) {
        res.status(200);

        return res.send({
          message: "Ready to logout!",
        });
      } else {
        res.status(400);
        return res.send({
          message: "Email or Password not valid",
        });
      }
    });
  });
});

router.get(
  "/admin",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    console.log(req.user);
    return res.json(req.user);
  }
);

router.get(
  "/employees_profile",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    return res.json(req.user);
  }
);

router.get(
  "/employees",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    User.findAll({}).then(function (dbEmployee) {
      res.json(dbEmployee);
    });
  }
);

//Getting one single user
router.get(
  "/employees/:id",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    User.findOne({
      where: {
        id: req.params.id,
      },
    }).then((dbUser) => {
      res.json(dbUser);
    });
  }
);

router.put("/employees/:id", (req, res) => {
  User.update(
    {
      ...req.body,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  ).then(function (dbEmployee) {
    res.json(dbEmployee);
  });
});

module.exports = router;
