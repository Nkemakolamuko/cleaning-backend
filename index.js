const express = require("express");
const cors = require("cors");
require("dotenv").config();
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");
const cleanersRoute = require("./routes/cleaner.route.js");
const dbConnect = require("./db/dbConnect.js");
const errorHandler = require("./middleware/errorHandler.js");

const app = express();
// CORS
// app.use(
//   cors({
// origin: "https://247-cleaning.vercel.app",
//     origin: "https://247-cleaning.vercel.app",
//     methods: ["POST, GET, PUT, PATCH, DELETE"],
//   })
// );
app.use(cors());
app.options("*", cors());
dbConnect();
const PORT = process.env.PORT || 5001;

// Middlewares
// Normal JSON
app.use(express.json());
app.use(errorHandler);
// This one allows for getting values from form
app.use(express.urlencoded({ extended: false }));

app.use("/api/products", productRoute); // The user will make request to this route - so it's post - it's a base url, the methods are in the routes folder
app.use("/api/users", userRoute); // For registering users
app.use("/api/cleaners", cleanersRoute); // For getting cleaners nearby

app.get("/", (req, res) => {
  res.send("Holla... connected and working.");
});

const start = () => {
  dbConnect();
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
};

start();
