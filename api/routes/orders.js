const express = require("express");
const router = express.Router();
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);

router.get("/", (req, res, next) => {
  let shoppingCart = database.get("shoppingCart").value();
  res.send(shoppingCart);
});

router.post("/", (req, res, next) => {
  let id = req.body.id;
  id = parseInt(id);
  let object = database
    .get("products")
    .find({ id: id })
    .value();
  if (object) {
    let checkifExists = database
      .get("shoppingCart")
      .find({ id: id })
      .value();
    if (!checkifExists) {
      database
        .get("shoppingCart")
        .push(object)
        .write();
      res.send({
        status: "success",
        data: object
      });
    } else {
      res.status(200).json({
        message: "Produkten togs bort från varukorgen"
      });
    }
  } else {
    res.status(200).json({
      message: "Produkten finns inte i produktkatlogen"
    });
  }
});

router.delete("/", (req, res, next) => {
  let id = req.body.id;
  id = parseInt(id);
  let object = database
    .get("shoppingCart")
    .find({ id: id })
    .value();
  if (object) {
    let checkifExists = database
      .get("shoppingCart")
      .find({ id: id })
      .value();
    if (!checkifExists) {
    } else {
      res.status(200).json({
        message: "Produkten togs bort från varukorgen"
      });
    }
  } else {
    res.status(200).json({
      message: "Produkten finns inte i varukorgen"
    });
  }
  database
    .get("shoppingCart")
    .remove(object)
    .write();
  res.send(object);
});

module.exports = router;
