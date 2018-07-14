'use strict';
require("../../db")
const categoryService = require("../../service/category");

function testAdd() {
    let data = {
        name: "食品"
    }

    categoryService.addCategory(data)
}

function testUpdate() {
    let data = {
        name: "美妆"
    }
    categoryService.updateCategory("5b4717cb8baccfa04cec2e5f", data)
}

function testDelete() {
    let id = "5b4717c04024d0aca85cbeb4"
    categoryService.deleteCategory(id)
}

async function testFind() {
    let page = 3;
    let result = await categoryService.findCategorysByPage(page)
    console.log(result);
}

// testAdd()
// testUpdate()
// testDelete()
testFind()

