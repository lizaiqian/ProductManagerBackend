'use strict';
require("../../db")
const productService = require("../../service/product");

function testAddproduct() {
    let data = {
        name: "ddd",
        price: "0.55555",
        stock: 10000000,
        category: "5b4719c9b18711ae98be191e"
    }

    productService.addProduct(data)
}

async function testDeleteproduct() {
    await productService.deleteProduct("5b47233f5d8f02b0b8f8da2b")
}

async function testUpdateProduct() {
    let data = {
        name: "辣条",
        price: "5.10",
        stock: 10000,
        description: "好吃的辣条",
        category: "5b4719c9b18711ae98be191e"
    }
    await productService.updateProduct("5b47232fa6e108a2b05edfad", data)

}

async function testFindProduct() {
    let result = await productService.findByPage(2)
    console.log(result);
}

// testAddproduct()
// testDeleteproduct()
// testUpdateProduct()
testFindProduct()
