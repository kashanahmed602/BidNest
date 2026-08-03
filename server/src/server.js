require("dotenv").config();
const app = require("./app");
const connectDB = require("./DB/db");

connectDB();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is Running on Port ${PORT}`);
});

