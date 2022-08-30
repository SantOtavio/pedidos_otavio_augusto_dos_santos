const express = require("express");
const router = express.Router();


const usersController = require("./Users/users.controller");
const productsController = require("./Products/products.controller");
const ordersController = require("./Orders/orders.controller");
const orderProductsController = require("./OrderProducts/orderProducts.controller");



router.use("/users" , usersController);
router.use("/products", productsController);
router.use("/orders", ordersController);
router.use("/orderproducts", orderProductsController);


module.exports = router;