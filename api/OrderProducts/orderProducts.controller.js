const express = require("express");
const routes = express.Router();

const orderProductsHandler = require("./orderProducts.handler");

routes.post("/", async (req, res) => {
    const data = req.body;
    res.json(await orderProductsHandler.orderProductsRegister(data));
});

module.exports = routes;