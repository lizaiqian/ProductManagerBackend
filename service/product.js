'use strict';

const Product = require("../model/product");
const config = require("../config")

async function isIsExist(id) {
    try {
        await Product.findOne({_id: id})
    } catch (e) {
        throw Error("id不存在")
    }
}

async function addProduct(product) {

    try {
        await Product.create(product)
    } catch (e) {
        throw Error("添加失败")
    }
}

async function deleteProduct(id) {
    await isIsExist(id)
    let result = await Product.deleteOne({_id: id})
    if(result.n < 1) {
        throw Error("删除失败")
    }
}

async function updateProduct(id, product) {
    await isIsExist(id)
    let result = await Product.updateOne({_id: id}, product)
    if(result.n < 1) {
        throw Error("更新失败")
    }
}

async function findById(id) {
    return await Product.findOne({_id: id});
}

async function findByPage(page = 1) {
    return await Product.find().skip((page - 1) * config.PAGE_COUNT).limit(config.PAGE_COUNT).sort("-created")
}

module.exports = {
    addProduct,
    updateProduct,
    deleteProduct,
    findByPage,
    findById
}

