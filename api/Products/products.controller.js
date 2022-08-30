const express = require("express");
const routes = express.Router();

const productsHandler = require("./products.handler");

routes.post("/", async (req, res) => {
    const data = req.body;
    res.json(await productsHandler.productsRegister(data));
});

module.exports = routes;