const mongoose = require("mongoose");
require("dotenv").config(); // I need to install dotenv package

async function dbConnect() {
  mongoose
    .connect(
      process.env.DB_URL, // These are options to ensure the connections are done properly - check the url in the .env and fix something
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // useCreateIndex: true, // Maybe I need to remove this comment when I connect to internet
      }
    )
    .then(() => {
      console.log("Successfully connected to MongoDB Atlas!");
    })
    .catch((error) => {
      console.log("Unable to connect to MongoDB Atlas!");
      console.error(error);
      process.exit(1); // This will cause the app to crash before exiting - but process.exit(0) won't
    });
}

module.exports = dbConnect;
