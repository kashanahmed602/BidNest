const express = require("express");
const router = express.Router();

const { createAuction, getAuctions, updateAuction, marketAuctions, auctionDelete } = require("../Controller/auctionController");
const upload = require("../Middleware/upload");
const auth = require("../Middleware/auth");

router.post("/createAuction", auth, upload.single("image"), createAuction);
router.get("/auctions",auth, getAuctions);
router.put("/auctionUpdate/:id", updateAuction);
router.get("/marketAuctions", auth, marketAuctions);
router.delete("/deletAuction/:id", auth, auctionDelete);


module.exports = router;