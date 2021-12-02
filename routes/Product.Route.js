
const express = require("express");
const router = express.Router();
const utils = require('../utils/index.js');

const product = require('../controller/product.controller');


router.post('/documents/addDocument',  product.addDocument);
router.get('/documents/getdocuments' ,product.getAllDocuments);


module.exports = router;