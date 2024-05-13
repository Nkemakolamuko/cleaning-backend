const express = require("express");
// const cors = require("cors");
const productRoute = require("./routes/product.route.js");
const userRoute = require("./routes/user.route.js");
const cleanersRoute = require("./routes/cleaner.route.js");
const dbConnect = require("./db/dbConnect.js");
const errorHandler = require("./middleware/errorHandler.js");

dbConnect();
const app = express();
const PORT = process.env.PORT || 5001;

// Middlewares
// CORS
// app.use(cors());
// Normal JSON
app.use(express.json());
app.use(errorHandler);
// This one allows for getting values from form
app.use(express.urlencoded({ extended: false }));

// Routes base url(which I'd change to the hosted one--) (No no no - it will now be the hosted-link/api/products and so on) - and module to call
app.use("/api/products", productRoute); // The user will make request to this route - so it's post - it's a base url, the methods are in the routes folder
app.use("/api/users", userRoute); // For registering users
app.use("/api/cleaners", cleanersRoute); // For getting cleaners nearby

app.get("/", (req, res) => {
  // Home Url for API
  //   res.write("working...")
  //   res.end();
  res.send("Holla..");
});

const start = () => {
  dbConnect();
  app.listen(PORT, () => console.log(`Running on port ${PORT}`));
};

start();
