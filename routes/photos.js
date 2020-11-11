const express = require("express");
const router = express.Router();
const Gallery = require("../models").Gallery;

// DELETE route for gallery.
router.delete(
  "/gallery/:id",

  (req, res) => {
    Gallery.destroy({
      where: {
        id: req.params.id,
      },
    }).then((dbGallery) => {
      res.json(dbGallery);
    });
  }
);

//ROUTE TO ADD TO GALLERY
router.post("/gallery", (req, res) => {
  Gallery.create({
    url: req.body.url,
  })
    .then((dbGallery) => {
      res.json(dbGallery);
    })
    .catch((err) => {
      res.json(err);
    });
});

//ROUTE TO GET ALL PHOTOS
router.get("/gallery", (req, res) => {
  Gallery.findAll({})
    .then((dbGallery) => {
      res.json(dbGallery);
    })
    .catch((err) => res.json(err));
});

module.exports = router;
