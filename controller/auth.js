const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/dbConnection')
const {userExist} = require('../utils/Checker') 
const User = require('../models/User')
exports.login = async (req,res,next) =>{
    const {email, password} = req.body
    const users = await db.sequelize.query("SELECT * FROM `users`");
    res.status(200).json({
        status: "SUCCESS",
        data: users
    }) 
}
exports.me =  async(req,res,next)  => {
    try{
        const products = await db.sequelize.query("SELECT p.*, c.name AS cat_name, cur.* , f.* FROM `products` AS p JOIN `categories` AS c ON p.category_id = c.id JOIN `product_currencies` AS cur ON p.id = cur.product_id JOIN `files` AS f ON f.fileable_id = p.id");
        res.status(200).json({
            status: "SUCCESS",
            data: products
        }) 
    } catch (err) {
        res.status(400).json({
            status: "errors",
            error: err
        })
  }
}

exports.users =  async(req,res,next)  => {
        try{
            const users = await User.findAll();
            res.status(200).json({
                status: "SUCCESS",
                data: users
            }) 
        } catch (err) {
            res.status(400).json({
                status: "errors",
                error: err
            })
    }
}


