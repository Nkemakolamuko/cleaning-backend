const express = require("express");
const cors = require("cors");
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");
const cleanersRoute = require("./routes/cleaner.route.js");
const dbConnect = require("./db/dbConnect.js");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();

// CORS configuration
app.use(
  cors({
    origin: "https://247-cleaning.vercel.app",
    methods: ["POST", "GET", "PUT", "PATCH", "DELETE"],
  })
);
app.options("*", cors());

const PORT = process.env.PORT || 5001;

// Connect to database
dbConnect();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/products", productRoute);
app.use("/api/users", userRoute);
app.use("/api/cleaners", cleanersRoute);

// Root route
app.get("/", (req, res) => {
  res.send("Holla... connected and working.");
});

// Error handling middleware
app.use(errorHandler);

// Start server
const start = () => {
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
};

start();
