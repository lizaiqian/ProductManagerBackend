'use strict';

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let product = new Schema({
    name: {
        type : String,
        required: [true, "商品名为必填项"],
        unique: [true, "商品名不可重复"]
    },
    price: {
        type: String,
        required: [true, "商品价格为必填项"]
    },
    isOnsale: {
        type: Boolean,
        default: true
    },
    stock: {
        type: Number,
        required: [true, "商品库存为必填"],
        default: 0
    },
    description: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now()
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "商品类别为必填"]
    }

});

module.exports = mongoose.model("product", product);

