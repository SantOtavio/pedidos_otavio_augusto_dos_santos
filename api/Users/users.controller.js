const express = require("express");
const routes = express.Router();

const usersHandler = require("./users.handler");

routes.post("/", async (req, res) => {
    const data = req.body;
    res.json(await usersHandler.userRegister(data));
});

routes.get("/", async (req, res) => {
    res.json(await usersHandler.getUsers());
})


module.exports = routes;