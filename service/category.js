'use strict';
const Category = require("../model/category");
const config = require("../config")

async function isIdExist(id) {

    try {
        await Category.findOne({_id: id})
    } catch (e) {
        throw Error("id不存在")
    }

}

async function addCategory(category) {
    let result = await Category.create(category)
    return result
}

async function deleteCategory(id) {
    await isIdExist(id)
    let result = await Category.deleteOne({_id: id})
    if(result.n < 1) {
        throw Error("删除失败")
    }
}

async function updateCategory(id, category) {
    await isIdExist(id)
    let result = await Category.updateOne({_id: id}, category)
    if(result.n < 1) {
        throw Error("更新失败")
    }
}

async function findCategorysByPage(page = 1) {
    return await Category.find().skip((page - 1) * config.PAGE_COUNT).limit(config.PAGE_COUNT).sort("created")
}


module.exports = {
    addCategory,
    deleteCategory,
    updateCategory,
    findCategorysByPage
}


