const express = require('express');
const router = express.Router();
const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('database.json');
const database = lowdb(adapter);

router.get('/', (req, res, next) => {
    let shoppingCart = database.get('shoppingCart').value();
        res.send(shoppingCart);
});

router.post('/', (req, res, next) => {

    let id = req.body.id;
    id = parseInt(id)

    let object = database.get("products")
    .find({id : id})
    .value();

    if(object) {
        let checkifExists = database.get("shoppingCart").find({id: id}).value()
        if(!checkifExists) {
             
        database.get("shoppingCart")
        .push(object)
        .write();
    
        res.send(object)
        } else {
            res.status(200).json({
                message:"produkten finns redan i varukorgen"
            });
        }
    } else {
        res.status(200).json({
            message:"produkten finns inte i produktkatlogen"
        });
    }

});

router.delete('/', (req, res, next) => {
    let id = req.body.id;
    id = parseInt(id)

    let object = database.get("shoppingCart")
    .find({id : id})
    .value();

    if(object) {
        let checkifExists = database.get("shoppingCart").find({id: id}).value()
        if(!checkifExists) {
             
        database.get("shoppingCart")
        .remove(object)
        .write();
    
        res.send(object)
        } else {
            res.status(200).json({
                message:"produkten finns inte i varukorgen"
            });
        }
    } else {
        res.status(200).json({
            message:"produkten finns inte i produktkatlogen"
        });
    }


    database.get("shoppingCart")
    .remove(object)
    .write();

    res.send(object)
});

module.exports = router; 