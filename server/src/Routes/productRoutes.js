const express = require("express");
const router = express.Router();

const {createProduct, getProducts, deleteProduct, updateStatusProducts, getMarketPlaceProducts } = require("../Controller/productController");
const upload = require("../Middleware/upload");
const auth = require("../Middleware/auth");

router.post("/createProduct",auth,upload.single("image"), createProduct);
router.get("/products", getProducts);
router.delete("/productDeleted/:id", deleteProduct);
router.put("/updateStatusProducts/:id", updateStatusProducts);
router.get("/marketplaceProducts", auth, getMarketPlaceProducts);
// router.get("/products", getPendingProducts);

module.exports = router;