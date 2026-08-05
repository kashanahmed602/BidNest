const express = require("express");
const router = express.Router();

const {createProduct, getProducts } = require("../Controller/productController");
const upload = require("../Middleware/upload");

router.post("/createProduct",upload.single("image"), createProduct);
router.get("/getProducts", getProducts);

module.exports = router;