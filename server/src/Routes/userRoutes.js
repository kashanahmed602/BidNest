const express = require("express");
const router = express.Router();

const { registerUser, loginUser, loginAdmin } = require("../Controller/userController");

router.post("/registerUser", registerUser);
router.post("/loginUser", loginUser);
router.post("/loginAdmin", loginAdmin);

module.exports = router;