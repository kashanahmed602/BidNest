const express = require("express");
const router = express.Router();

const { registerUser, loginUser, loginAdmin, getUsers, updateStatus, addToWishlist, removeFromWishlist, getWishlist, userProfile, updateProfile, updatePassword } = require("../Controller/userController");
const  auth  = require("../Middleware/auth");
const { authLimiter, apiLimiter } = require("../Middleware/ratelimit");

router.post("/registerUser", authLimiter, registerUser);
router.post("/loginUser", authLimiter, loginUser);
router.post("/loginAdmin", authLimiter, loginAdmin);
router.get("/users", apiLimiter, getUsers);
router.put("/updateStatus/:id", apiLimiter, updateStatus);
router.put("/addInToWishlist",apiLimiter, auth, addToWishlist);
router.put("/removeFromWishlist", apiLimiter, auth, removeFromWishlist);
router.get("/wishlist", apiLimiter,auth, getWishlist);
router.get("/profile", apiLimiter,auth, userProfile);
router.put("/profileUpdate",apiLimiter, auth, updateProfile);
router.put("/updatePassword", apiLimiter, auth, updatePassword);

module.exports = router;