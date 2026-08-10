const express = require("express");
const router = express.Router();

const {createProduct, getProducts, deleteProduct, updateStatusProducts, getMarketPlaceProducts, getProductById, getPendingProducts, EditProduct } = require("../Controller/productController");
const upload = require("../Middleware/upload");
const auth = require("../Middleware/auth");

router.post("/createProduct",auth,upload.fields([{name: "image", maxCount: 1}, {name: "gallery", maxCount: 5}]), createProduct);
router.get("/products",auth, getProducts);
router.delete("/productDeleted/:id", deleteProduct);
router.put("/updateStatusProducts/:id", updateStatusProducts);
router.get("/marketplaceProducts", auth, getMarketPlaceProducts);
router.get("/product/:id",auth, getProductById);
router.get("/pendingProducts", auth, getPendingProducts);
router.put("/productUpdate/:id", auth, upload.fields([{name: "image", maxCount:1}, {name: "gallery", maxCount:5}]), EditProduct);

// router.get("/products", getPendingProducts);

module.exports = router;