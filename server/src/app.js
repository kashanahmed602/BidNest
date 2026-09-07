const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();
const allowedOrigins = new Set([
    "http://localhost:5173",
    "http://localhost:5174",
    "https://kas-bidnest.vercel.app",
    ...(process.env.CORS_ORIGINS || "")
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
]);

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.has(origin)) {
            return callback(null, true);
        }

        return callback(new Error("Origin is not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 204
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", require("./Routes/userRoutes"));
app.use("/api/v1", require("./Routes/countryRoutes"));
app.use("/api/v1", require("./Routes/productRoutes"));
app.use("/api/v1", require("./Routes/auctionRoutes"));
app.use("/api/v1", require("./Routes/paymentRoutes"));
app.use("/api/v1", require("./Routes/orderRoutes"));
app.use("/api/v1", require("./Routes/refreshRoutes"));


module.exports = app;