const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);

exports.initiateDatabase = () => {
    let dbInitiated = database.has("products").value();
    if(!dbInitiated) {
        database.defaults({ products: [], shoppingCart: [] }).write();
    }
};