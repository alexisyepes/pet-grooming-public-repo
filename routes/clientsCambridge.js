// Requiring our models
var Sequelize = require("sequelize");
const Op = Sequelize.Op;
var db = require("../models");
const passport = require("passport");
const verifyToken = require("./verifyToken");

module.exports = function (app) {
  //Client routes
  //Getting all clients
  app.get("/api/clients_cambridge", verifyToken, (req, res) => {
    db.ClientCambridge.findAll({
      include: [db.PetCambridge],
    }).then(function (dbClient) {
      res.json(dbClient);
    });
  });

  //Getting one single client
  app.get(
    "/auth/api/clients_cambridge/:id",
    passport.authenticate(["jwt"], {
      session: false,
    }),
    (req, res) => {
      console.log(req.user);
      // console.log(res)
      return db.ClientCambridge.findOne({
        where: {
          id: req.params.id,
        },
        include: [
          {
            model: db.PetCambridge,
            include: [{ model: db.CommentCambridge }],
          },
        ],
      }).then(function (dbClient) {
        if (typeof dbClient === "object") {
          res.json(dbClient);
        }
      });
    }
  );

  //Getting one single client
  app.get(
    "/auth/customer_cambridge/:regid",

    (req, res) => {
      console.log(req.user);
      // console.log(res)
      return db.ClientCambridge.findOne({
        where: {
          registrationNumber: req.params.regid,
        },
        include: [
          {
            model: db.PetCambridge,
            include: [{ model: db.CommentCambridge }],
          },
        ],
      }).then(function (dbClient) {
        if (typeof dbClient === "object") {
          res.json(dbClient);
        }
      });
    }
  );

  //Searching client by Last Name
  app.get("/api/clients_cambridge/lastName/:lastName", function (req, res) {
    db.ClientCambridge.findAll({
      where: {
        lastName: req.params.lastName,
      },
      include: [
        {
          model: db.PetCambridge,
        },
      ],
    }).then(function (dbClient) {
      console.log(res);
      console.log(dbClient);
      //form validation on modal
      if (typeof dbClient === "object") {
        res.json(dbClient);
      }
    });
  });

  //Searching client by First Name
  app.get("/api/clients_cambridge/firstName/:firstName", function (req, res) {
    db.ClientCambridge.findAll({
      where: {
        firstName: req.params.firstName,
      },
      include: [
        {
          model: db.PetCambridge,
        },
      ],
    }).then(function (dbClient) {
      console.log(res);
      console.log(dbClient);
      //form validation on modal
      if (typeof dbClient === "object") {
        res.json(dbClient);
      }
    });
  });

  //Searching client by phone
  app.get(
    "/api/clients_cambridge/primaryPhoneNumber/:primaryPhoneNumber",
    function (req, res) {
      db.ClientCambridge.findAll({
        where: {
          [Op.or]: [
            {
              primaryPhoneNumber: req.params.primaryPhoneNumber,
            },
            {
              cellphone: req.params.primaryPhoneNumber,
            },
            {
              workPhone: req.params.primaryPhoneNumber,
            },
          ],
        },
        include: [
          {
            model: db.PetCambridge,
          },
        ],
      }).then(function (dbClient) {
        //form validation on modal
        if (typeof dbClient === "object") {
          res.json(dbClient);
        }
      });
    }
  );

  //Searching Pet by Name
  app.get("/api/pets_cambridge/name/:name", function (req, res) {
    db.PetCambridge.findAll({
      where: {
        name: req.params.name,
      },
    }).then(function (dbPet) {
      console.log(res);
      console.log(dbPet);
      //form validation on modal
      if (typeof dbPet === "object") {
        res.json(dbPet);
      }
    });
  });

  // POST route for saving a new client
  app.post("/api/clients_cambridge", function (req, res) {
    db.ClientCambridge.create({
      ...req.body,
    })
      .then(function (dbClient) {
        res.json(dbClient);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // DELETE route for deleting clients.
  app.delete("/api/clients_cambridge/:id", function (req, res) {
    db.ClientCambridge.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbClient) {
      res.json(dbClient);
    });
  });

  // PUT route for updating clients.
  app.put("/api/clients_cambridge/:id", function (req, res) {
    db.ClientCambridge.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(function (dbClient) {
        res.json(dbClient);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // C O M M E N T S   R O U T E S //////////////////////////
  // POST route for saving a new Comment
  app.post("/api/comments_cambridge/:PetCambridgeId", function (req, res) {
    db.CommentCambridge.create({
      ...req.body,
      PetCambridgeId: req.params.PetCambridgeId,
    })
      .then(function (dbComment) {
        res.json(dbComment);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // PUT route for updating Comments.
  app.put("/api/comments_cambridge/:id", function (req, res) {
    db.CommentCambridge.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(function (dbComment) {
        res.json(dbComment);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  //Getting one single comment
  app.get("/api/comments_cambridge/:id", (req, res) => {
    return db.CommentCambridge.findOne({
      where: {
        id: req.params.id,
      },
    }).then(function (dbComment) {
      if (typeof dbComment === "object") {
        res.json(dbComment);
      }
    });
  });

  // DELETE route for deleting comments.
  app.delete("/api/comments_cambridge/:id", function (req, res) {
    db.CommentCambridge.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbComment) {
      res.json(dbComment);
    });
  });

  // P E T S   R O U T E S //////////////////////////////

  // POST route for saving a new Pet
  app.post("/api/pets_cambridge/:ClientCambridgeId", function (req, res) {
    db.PetCambridge.create({
      ...req.body,
      ClientCambridgeId: req.params.ClientCambridgeId,
    })
      .then(function (dbPet) {
        res.json(dbPet);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  //Getting all pets
  app.get("/api/pets_cambridge", verifyToken, (req, res) => {
    db.PetCambridge.findAll({
      include: [db.CommentCambridge],
    }).then(function (dbPet) {
      res.json(dbPet);
    });
  });

  // DELETE route for deleting Pets.
  app.delete("/api/pets_cambridge/:id/", function (req, res) {
    db.PetCambridge.destroy({
      where: {
        id: req.params.id,
      },
    }).then(function (dbPet) {
      res.json(dbPet);
    });
  });

  //Getting one single pet
  app.get("/auth/api/pets_cambridge/:id", (req, res) => {
    return db.PetCambridge.findOne({
      where: {
        id: req.params.id,
      },
      include: [db.CommentCambridge],
    }).then(function (dbPet) {
      if (typeof dbPet === "object") {
        res.json(dbPet);
      }
    });
  });

  // PUT route for updating pets.
  app.put("/api/pets_cambridge/:id", function (req, res) {
    db.PetCambridge.update(
      {
        ...req.body,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    )
      .then(function (dbPet) {
        res.json(dbPet);
      })
      .catch(function (err) {
        res.json(err);
      });
  });

  // PUT route for updating img on pets.
  app.put("/pets_img_cambridge/:PetCambridgeId", async (req, res) => {
    // console.log(req.file);
    await db.PetCambridge.update(
      {
        petImg: req.body.petImg,
      },
      {
        where: {
          id: req.params.PetCambridgeId,
        },
      }
    )
      .then(function (dbPet) {
        res.json(dbPet);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};
