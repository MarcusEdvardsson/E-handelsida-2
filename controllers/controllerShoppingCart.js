const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);


exports.showShoppingCart = async (request, response) => {
  let data = await database.get("shoppingCart").value();

  if (data == "") {
    response.status(200).json({
      status: "success",
      message: "There is no products in the shoppingcart"
    });
  } else {
    let message = {
      status: "success",
      message: "getting all the items in the shoppingcart",
      data: data
    };
    response.send(message);
  }
};

exports.checkIfExistsShoppingCart = (request, response, next) => {
    let id = request.body.id;
    id = parseInt(id);
  
    let object = database
      .get("products")
      .find({ id: id })
      .value();
  
    let checkObject = {
      id: id,
      name: object.name,
      price: object.price,
      image: object.image
    };
  
    let checkIfExists = database
      .get("shoppingCart")
      .find(checkObject)
      .value();
  
    if (!checkIfExists) {
      next();
    } else {
      let message = {
        status: "failed",
        message: "Produkten finns redan i shoppingcart",
        data: checkObject
      };
      response.status(200).json(message);
    }
};

exports.checkIfProductExists = (request, response, next) => {
    let id = request.body.id;
    id = parseInt(id);
  
    let ids = database
      .get("products")
      .map("id")
      .value();
  
    let object = database
      .get("products")
      .find({ id: id })
      .value();
  
    if (object) {
      let sizeArray = object.size;
      if (ids.indexOf(id) != -1) {
      } else {
        response.status(200).json({
          status: "failed",
          message:
            "the product you are trying to add does not exist in the database"
        });
      }
      next();
    } else {
      response.status(200).json({
        status: "failed",
        message:
          "the product you are trying to add does not exist in the database"
      });
    }
};

exports.addToShoppingCart = async (request, response) => {
    let id = request.body.id;
    id = parseInt(id);
  
    let object = database
      .get("products")
      .find({ id: id })
      .value();
  
    let name = object.name;
    let price = object.price;
    let image = object.image;
  
    let sizeArray = object.size;
    if (sizeArray.indexOf(size) != -1) {
      database
        .get("shoppingCart")
        .push({ id: id, name: name, price: price, image: image })
        .write();
  
      let addedObject = {
        id: id,
        name: object.name,
        price: object.price,
        size: size,
        image: object.image
      };
  
      let message = {
        status: "success",
        message: "added the product to the shoppingcart",
        data: addedObject
      };
      response.send(message);
    }
};

exports.checkDeleteProduct = (request, response, next) => {
    let message = {
      status: "failed",
      message: "you must provide key: id value: id and key: size value: size"
    };
    if (!request.body.id || !request.body.size) {
      response.status(400).json(message);
    }
    next();
};
  

exports.deleteFromShoppingCart = async (request, response) => {
    let id = request.body.id;
    let size = request.body.size;
    id = parseInt(id);
    size = parseInt(size);
  
    let ids = database
      .get("shoppingCart")
      .map("id")
      .value();
    console.log(ids);
  
    let object = database
      .get("products")
      .find({ id: id })
      .value();
  
    if (object) {
      let sizeArray = object.size;
      if (ids.indexOf(id) != -1 && sizeArray.indexOf(size) != -1) {
        database
          .get("shoppingCart")
          .remove({ id: id, size: size })
          .write();
  
        let message = {
          status: "success",
          message: "product removed from the shoppingcart"
        };
        response.send(message);
      } else {
        response.status(200).json({
          status: "failed",
          message:
            "the product cant be removed since it does not exist in the shoppingcart"
        });
      }
    } else {
      response.status(200).json({
        status: "failed",
        message:
          "the product cant be removed since it does not exist in the shoppingcart"
      });
    }
};