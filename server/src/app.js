const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
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
app.use("/api/v1", require("./Routes/refreshRoutes"));


module.exports = app;