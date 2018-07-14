'use strict';
require("../../db")
const orderService = require("../../service/order");

function testAddOrder() {
    let data = {
        productId: "5b47222cd1ceb56a5ccdf18c",
        count: 5
    }
    orderService.addOrder(data)

}

async function testFindOrder() {
    let result = await orderService.findOrdersByPage(1)
    console.log(result);
}

async function testFindUnpayOrder() {
    let result = await orderService.findUnpayedOrdersByPage(2)
    console.log(result)
}

// testAddOrder()
// testFindOrder()
testFindUnpayOrder()