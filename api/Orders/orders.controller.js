const express = require("express");
const routes = express.Router();

const ordersHandler = require("./orders.handler");

routes.post("/", async (req, res) => {
    const data = req.body;
    res.json(await ordersHandler.ordersRegister(data));
});

module.exports = routes;