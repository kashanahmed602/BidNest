const express = require("express");
const router = express.Router();

const { createAuction, getAuctions, updateAuction, marketAuctions, auctionDelete, getAuctionById, getPendingAuction } = require("../Controller/auctionController");
const upload = require("../Middleware/upload");
const auth = require("../Middleware/auth");

router.post("/createAuction", auth, upload.fields([{ name: "image" }, { name: "gallery" }]), createAuction);
router.get("/auctions",auth, getAuctions);
router.put("/auctionUpdate/:id", updateAuction);
router.get("/marketAuctions", auth, marketAuctions);
router.delete("/deletAuction/:id", auth, auctionDelete);
router.get("/auction/:id", auth, getAuctionById);
router.get("/pendingAuctions", auth, getPendingAuction);


module.exports = router;