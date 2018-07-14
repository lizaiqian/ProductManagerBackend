'use strict';

const router = require("express").Router();
const categoryService = require("../service/category");

router.get("/", async(req, res, next) => {
    let param = req.query
    let result = await categoryService.findCategorysByPage(param.page)
    res.success(result)
})

router.post("/", async (req, res) => {
    const param = req.body;
    let result = await categoryService.addCategory(param)
    res.success(result)
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id;
    let result = await categoryService.deleteCategory(id)
    res.success("删除成功")
})

router.put("/:id", async (req, res) => {
    const id = req.params.id;
    let result = await categoryService.updateCategory(id, req.body)
    res.success("更新成功")
})

module.exports = router