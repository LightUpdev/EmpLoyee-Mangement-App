const express = require("express");
const cors = require("cors");
const app = express();
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const { default: mongoose } = require("mongoose");
const employeeRoute = require("./routes/employeeRoute");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

// home route
app.get("/", (req, res) => {
  res.send("Employee management server is running");
});

// middleware
app.use(cors());
app.use(bodyParser.json());

// employee middleware route
app.use("/api/employee", employeeRoute);

// create PORT for server
const PORT = process.env.PORT || 8000;

const connectToMongoDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`application running in port ${PORT}`);
      });
    })
    .catch((err) => {
      // error middleware
      app.use(errorHandler);
      console.log(err);
    });
};

connectToMongoDB();
