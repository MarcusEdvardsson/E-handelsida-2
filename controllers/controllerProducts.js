const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("database.json");
const database = lowdb(adapter);

exports.getProducts = (request, response) => {
  let data = database.get("products").value();

  let message = {
    status: "success",
    message: "getting all the products",
    data: data
  };
  response.send(message);
};