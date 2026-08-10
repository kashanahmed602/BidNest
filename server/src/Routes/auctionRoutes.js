const express = require("express");
const router = express.Router();

const { createAuction, getAuctions, updateAuction, marketAuctions, auctionDelete, getAuctionById, getPendingAuction, editAuction } = require("../Controller/auctionController");
const upload = require("../Middleware/upload");
const auth = require("../Middleware/auth");

router.post("/createAuction", auth, upload.fields([{ name: "image" }, { name: "gallery" }]), createAuction);
router.get("/auctions",auth, getAuctions);
router.put("/auctionUpdate/:id", updateAuction);
router.get("/marketAuctions", auth, marketAuctions);
router.delete("/deletAuction/:id", auth, auctionDelete);
router.get("/auction/:id", auth, getAuctionById);
router.get("/pendingAuctions", auth, getPendingAuction);
router.put("/auctionUpdated/:id", auth,upload.fields([{name: "image", maxCount:1}, {name: "gallery", maxCount:5}]), editAuction);


module.exports = router;