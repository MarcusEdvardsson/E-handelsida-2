const express = require('express');
const router = express.Router();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);

router.get('/', (req, res, next) => {
        let products = database.get('products').value();
        res.send(products);
});

module.exports = router; 