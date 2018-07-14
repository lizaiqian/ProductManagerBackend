'use strict';

const mongoose = require("mongoose");
let Schema = mongoose.Schema;

let order = new Schema({
    productId: {
        type: String,
        required: [true, "必须有product编号"]
    },
    productName: {
        type: String,
        required: [true, "必须有商品名"]
    },
    productPrice: {
        type: String,
        required: [true, "必须有商品价格"]
    },
    count: {
        type: Number,
        required: [true, "必须有商品数量"],
        min: [1, "商品数不能小于1"]
    },
    status: {
        type: String,
        default: "unpay"
    },
    totalPrice: {
        type: Number,
        required: [true, "总价必须有"],
        min: 0
    },
    created: {
        type: Date,
        default: Date.now()
    },
    payTime: {
        type : Date
    },
    cancelTime: {
        type: Date
    }

});

module.exports = mongoose.model("order", order);