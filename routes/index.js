
const express = require("express");
const router = express.Router();


const Productroute = require('./Product.Route');


// router.use("/admin", adminRoutes);

router.use("", Productroute);

// const productsale = require('../controller/ProductSale.controller');

module.exports = router;