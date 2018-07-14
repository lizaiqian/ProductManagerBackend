'use strict';
const orderService = require("../service/order");
const router = require("express").Router();

router.get("/", async(req, res) => {
    let result = await orderService.findOrdersByPage(req.query.page);
    res.success(result);
});

router.get("/unpay", async (req, res) => {
    let result = await orderService.findUnpayedOrdersByPage(req.query.page);
    res.success(result);
});

router.post("/", async (req, res) => {
    let result = await orderService.addOrder(req.body)
    res.success(result)
})

module.exports = router;
