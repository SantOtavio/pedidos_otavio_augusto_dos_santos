const express = require("express");
const routes = express.Router();

const ordersHandler = require("./orders.handler");

routes.post("/", async (req, res) => {
    const data = req.body;
    res.json(await ordersHandler.ordersRegister(data));
});

routes.put("/:id", async (req, res) => {
    const data = req.body;
    const id = req.params.id;
    res.json(await ordersHandler.ordersClose(id , data));
});

module.exports = routes;