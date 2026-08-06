const express = require("express");
const router = express.Router();

const { createAuction, getAuctions } = require("../Controller/auctionController");
const upload = require("../Middleware/upload");
const auth = require("../Middleware/auth");

router.post("/createAuction", auth, upload.single("image"), createAuction);
router.get("/auctions", getAuctions);

module.exports = router;