const express = require("express");
const router = express.Router();

const { createAuction, getAuctions, updateAuction, marketAuctions, auctionDelete, getAuctionById, getPendingAuction, editAuction, placeBid, getWinner } = require("../Controller/auctionController");
const upload = require("../Middleware/upload");
const auth = require("../Middleware/auth");
const { apiLimiter } = require("../Middleware/ratelimit");

router.post("/createAuction", apiLimiter, auth, upload.fields([{ name: "image" }, { name: "gallery" }]), createAuction);
router.get("/auctions", apiLimiter, auth, getAuctions);
router.put("/auctionUpdate/:id", apiLimiter, updateAuction);
router.get("/marketAuctions", apiLimiter, auth, marketAuctions);
router.delete("/deletAuction/:id", apiLimiter, auth, auctionDelete);
router.get("/auction/:id", apiLimiter, auth, getAuctionById);
router.get("/pendingAuctions", apiLimiter, auth, getPendingAuction);
router.put("/auctionUpdated/:id", apiLimiter, auth, upload.fields([{name: "image", maxCount:1}, {name: "gallery", maxCount:5}]), editAuction);
router.post("/placeBid", apiLimiter, auth, placeBid);
router.get("/getWinner", apiLimiter, auth, getWinner);

module.exports = router;