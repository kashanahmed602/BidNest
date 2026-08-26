const express = require("express");
const router = express.Router();

const {createProduct, getProducts, deleteProduct, updateStatusProducts, getMarketPlaceProducts, getProductById, getPendingProducts, EditProduct } = require("../Controller/productController");
const upload = require("../Middleware/upload");
const auth = require("../Middleware/auth");
const { apiLimiter } = require("../Middleware/ratelimit");

router.post("/createProduct", apiLimiter,auth,upload.fields([{name: "image", maxCount: 1}, {name: "gallery", maxCount: 5}]), createProduct);
router.get("/products",apiLimiter,auth, getProducts);
router.delete("/productDeleted/:id", apiLimiter, deleteProduct);
router.put("/updateStatusProducts/:id", apiLimiter, updateStatusProducts);
router.get("/marketplaceProducts", apiLimiter, auth, getMarketPlaceProducts);
router.get("/product/:id",apiLimiter,auth, getProductById);
router.get("/pendingProducts", apiLimiter, auth, getPendingProducts);
router.put("/productUpdate/:id", apiLimiter, auth, upload.fields([{name: "image", maxCount:1}, {name: "gallery", maxCount:5}]), EditProduct);

// router.get("/products", getPendingProducts);

module.exports = router;