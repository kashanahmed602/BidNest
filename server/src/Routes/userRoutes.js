const express = require("express");
const router = express.Router();

const { registerUser, loginUser, loginAdmin, getPendingUsers, updateStatus } = require("../Controller/userController");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/loginAdmin", loginAdmin);
router.get("/pendingUsers", getPendingUsers);
router.put("/updateStatus/:id", updateStatus);

module.exports = router;