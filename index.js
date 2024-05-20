const express = require("express");
require("dotenv").config();
const cors = require("cors");
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");
const cleanersRoute = require("./routes/cleaner.route.js");
const dbConnect = require("./db/dbConnect.js");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();

// CORS
app.use(cors());
app.options("*", cors());

// Serve static files
app.use(express.static("./uploads"));

// Database
dbConnect();
const PORT = process.env.PORT || 5001;

// Middlewares
// Normal JSON
app.use(express.json());
app.use(errorHandler);
// This one allows for getting values from form
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/cleaners", cleanersRoute);

app.get("/", (req, res) => {
  res.send("Holla... connected and working.");
});

const start = () => {
  dbConnect();
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
};

start();
