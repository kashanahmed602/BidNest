const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1", require("./Routes/userRoutes"));
app.use("/api/v1", require("./Routes/countryRoutes"));
app.use("/api/v1", require("./Routes/productRoutes"));
app.use("/api/v1", require("./Routes/auctionRoutes"));
app.use("/api/v1", require("./Routes/paymentRoutes"));
app.use("/api/v1", require("./Routes/orderRoutes"));


module.exports = app;