const express = require("express");
const router = express.Router();

const { registerUser, loginUser, loginAdmin, getUsers, updateStatus, addToWishlist, removeFromWishlist, getWishlist } = require("../Controller/userController");
const  auth  = require("../Middleware/auth");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/loginAdmin", loginAdmin);
router.get("/users", getUsers);
router.put("/updateStatus/:id", updateStatus);
router.put("/addInToWishlist", auth, addToWishlist);
router.put("/removeFromWishlist", auth, removeFromWishlist);
router.get("/wishlist", auth, getWishlist);

module.exports = router;