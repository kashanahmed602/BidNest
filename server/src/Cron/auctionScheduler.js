const cron = require("node-cron");
const Auction = require("../Models/auctionModel");

const startAuctionScheduler = () => {

    cron.schedule("* * * * * *", async () => {

        try {

            const now = new Date();

            const auctions = await Auction.find({
                approvalStatus: "approved",
                auctionStatus: {
                    $in: ["upcoming", "live"]
                }
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

                    await auction.save();

                    console.log(
                        `Auction ${auction._id} has ENDED`
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