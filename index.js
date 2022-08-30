const express = require("express");
const App = express();
const route = express.Router();
const routes = require("./api/routes");

App.use(express.json());
App.use(route);

route.get("/", (req, res) => {
    res.send("Sant Orders")
});

route.use("/api", routes);

App.listen("3000", () => {
    console.log("App listening at http://localhost:3000")
})