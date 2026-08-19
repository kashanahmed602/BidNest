require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");
const app = require("./app");
const connectDB = require("./DB/db");
const startAuctionScheduler = require("./Cron/auctionScheduler");

connectDB();

const PORT = process.env.PORT || 3000;

const server = http.createServer(app);

// attach socket.io
const io = new Server(server, {
    cors: {
        origin: true,
        methods: ["GET", "POST"]
    }
});

// make io available via app (so controllers can emit)
app.set("io", io);

io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("disconnect", () => {
        // console.log("Socket disconnected:", socket.id);
    });
});

server.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
    startAuctionScheduler();
});

