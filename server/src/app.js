const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", require("./Routes/userRoutes"));
app.use("/api/v1", require("./Routes/countryRoutes"));


module.exports = app;