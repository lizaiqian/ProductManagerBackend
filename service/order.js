'use strict';
const Order = require("../model/order");
const productService = require("../service/product");
const config = require("../config")
const bigDecimal = require("big.js");

async function addOrder(order) {
    try {
        //通过商品id获取商品详情
        const product = await productService.findById(order.productId);

        //如果商品库存小于订单商品数量
        if(product.stock < order.count) {
            throw Error("库存不足，添加失败")
        }

        //将商品详情赋值给订单
        order.productName = product.name;
        order.productPrice = product.price;

        order.totalPrice = bigDecimal(product.price).times(order.count);
        let result = await Order.create(order);

        product.stock -= order.count;
        productService.updateProduct(order.productId, product);

        return result;
    } catch (e) {
        throw Error(e.message)
    }
}

async function findOrdersByPage(page = 1) {
    return await Order.find().skip((page - 1) * config.PAGE_COUNT).limit(config.PAGE_COUNT).sort("created")
}

async function findUnpayedOrdersByPage(page = 1) {
    return await Order.find({status: "unpay"}).skip((page - 1) * config.PAGE_COUNT).limit(config.PAGE_COUNT).sort("created")
}


module.exports = {
    addOrder,
    findOrdersByPage,
    findUnpayedOrdersByPage
}