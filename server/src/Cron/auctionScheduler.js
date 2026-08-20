const cron = require("node-cron");
const Auction = require("../Models/auctionModel");

const startAuctionScheduler = () => {

    cron.schedule("* * * * * *", async () => {

        try {

            const now = new Date();

            const auctions = await Auction.find({
                approvalStatus: "approved",
                $or: [
                    { auctionStatus: { $in: ["upcoming", "live"] } },
                    { auctionStatus: "ended", winnerId: null, "bids.0": { $exists: true } }
                ]
            });

            for (const auction of auctions) {

                const startTime = new Date(
                    auction.startDateTime
                );

                const endTime = new Date(
                    startTime.getTime() +
                    Number(auction.duration) *
                    60 *
                    60 *
                    1000
                );

                // Backfill auctions that ended before winner persistence was added.
                if (
                    auction.auctionStatus === "ended" &&
                    !auction.winnerId &&
                    auction.bids.length > 0
                ) {
                    const winningBid = auction.bids.reduce(
                        (highestBid, bid) =>
                            !highestBid || bid.amount > highestBid.amount
                                ? bid
                                : highestBid,
                        null
                    );

                    auction.winnerId = winningBid.bidderId;
                    await auction.save();

                    console.log(
                        `Winner backfilled for auction ${auction._id}: ${auction.winnerId}`
                    );

                    continue;
                }


                // ==============================
                // UPCOMING → LIVE
                // ==============================

                if (
                    auction.auctionStatus === "upcoming" &&
                    now >= startTime &&
                    now < endTime
                ) {

                    auction.auctionStatus = "live";

                    await auction.save();

                    console.log(
                        `Auction ${auction._id} is now LIVE`
                    );
                }


                // ==============================
                // LIVE → ENDED
                // ==============================

                if (
                    auction.auctionStatus === "live" &&
                    now >= endTime
                ) {

                    auction.auctionStatus = "ended";

                    // The last/highest bid wins when the auction ends.
                    const winningBid = auction.bids.reduce(
                        (highestBid, bid) =>
                            !highestBid || bid.amount > highestBid.amount
                                ? bid
                                : highestBid,
                        null
                    );

                    console.log(
                        `Auction ${auction._id} has ENDED. Winning Bid: ${winningBid ? winningBid.amount : "No bids"}`
                    );

                    auction.winnerId = winningBid
                        ? winningBid.bidderId
                        : null;

                    await auction.save();

                    console.log(
                        `Auction ${auction._id} has ENDED. Winner: ${auction.winnerId || "No bids"}`
                    );
                }

            }

        } catch (error) {

            console.error(
                "Auction Scheduler Error:",
                error
            );

        }

    });

    console.log("Auction scheduler started");

};

module.exports = startAuctionScheduler;