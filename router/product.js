'use strict';
const router = require("express").Router();
const productService = require("../service/product");

router.get("/", async(req, res) => {
    let result = await productService.findByPage(req.query.page);
    res.success(result)
})

router.post("/", async(req, res) => {
    let result;
    try {
        result = await productService.addProduct(req.body);
    } catch (e) {
        throw Error("添加商品失败");
    }
    res.success(result)
})

router.delete("/:id", async(req, res) => {
    try {
        await productService.deleteProduct(req.params.id)
    } catch (e) {
        throw Error("商品删除失败")
    }
    res.success("商品删除成功");

})

router.put("/:id", async (req, res) => {
    try {
        await productService.updateProduct(req.params.id, req.body)
    } catch (e) {
        throw Error("商品更新失败")
    }

    res.success("商品更新成功")
})

module.exports = router