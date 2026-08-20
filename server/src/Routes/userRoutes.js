const express = require("express");
const router = express.Router();

const { registerUser, loginUser, loginAdmin, getUsers, updateStatus, addToWishlist } = require("../Controller/userController");
const  auth  = require("../Middleware/auth");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/loginAdmin", loginAdmin);
router.get("/users", getUsers);
router.put("/updateStatus/:id", updateStatus);
router.put("/addInToWishlist", auth, addToWishlist)

module.exports = router;