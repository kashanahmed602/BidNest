const express = require("express");
const router = express.Router();

const { registerUser, loginUser, loginAdmin, getUsers, updateStatus } = require("../Controller/userController");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/loginAdmin", loginAdmin);
router.get("/users", getUsers);
router.put("/updateStatus/:id", updateStatus);

module.exports = router;