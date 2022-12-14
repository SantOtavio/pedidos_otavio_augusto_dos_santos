const express = require("express");
const routes = express.Router();

const orderProductsHandler = require("./orderProducts.handler");

routes.post("/", async (req, res) => {
    const data = req.body;
    res.json(await orderProductsHandler.orderProductsRegister(data));
});

routes.put("/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    res.json(await orderProductsHandler.orderProductsRemove(id, data));
});

module.exports = routes;