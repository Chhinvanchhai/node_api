
const Category = require('../models/Category');
const Product = require('../models/Product');
const ProductCurrency = require('../models/ProductCurrency');
require("../models/associations/Associations")


exports.products =  async(req,res,next)  => {
        try{
            const users = await Product.findAll({  
                include: [
                    {
                        model: Category,
                        as: "categories",
                    },
                    {
                        model: ProductCurrency,
                        as: "product_currencies",
                    },
                ],
            });
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

exports.category =  async(req,res,next)  => {
    try{
        const users = await Category.findAll({  include: [
            {
              model: Product,
              as: "products",
            },
          ],});
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

exports.currencies =  async(req,res,next)  => {
    try{
        const users = await ProductCurrency.findAll();
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
