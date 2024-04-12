const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    product_name : String,
    product_description : String,
    product_price : String,
    product_image: String
})

const productModel = mongoose.model("ourProducts", productSchema)

module.exports = productModel;