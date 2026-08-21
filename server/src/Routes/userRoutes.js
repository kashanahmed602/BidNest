const express = require("express");
const router = express.Router();

const { registerUser, loginUser, loginAdmin, getUsers, updateStatus, addToWishlist, removeFromWishlist, getWishlist, userProfile, updateProfile, updatePassword } = require("../Controller/userController");
const  auth  = require("../Middleware/auth");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/loginAdmin", loginAdmin);
router.get("/users", getUsers);
router.put("/updateStatus/:id", updateStatus);
router.put("/addInToWishlist", auth, addToWishlist);
router.put("/removeFromWishlist", auth, removeFromWishlist);
router.get("/wishlist", auth, getWishlist);
router.get("/profile", auth, userProfile);
router.put("/profileUpdate",auth, updateProfile);
router.put("/updatePassword", auth, updatePassword);

module.exports = router;