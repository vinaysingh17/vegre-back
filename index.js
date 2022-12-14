const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const paymentRoute = require("./paymentRoute");
const mongoose = require("mongoose");
const app = express();
const path = require("path");

// .connect("mongodb://localhost:27017/paymentorder", {
mongoose
  .connect(
    "mongodb+srv://bobprep:bobprep@cluster0.j7ff2bf.mongodb.net/?retryWrites=true&w=majority",
    {
      useFindAndModify: true,
      useUnifiedTopology: true,
      useNewUrlParser: true,
    }
  )
  .then(() => console.log("DB CONNECTEDd"))
  .catch(() => console.log("FAILED TO CONNET WITH DB"));

app.use(bodyParser.json());
app.use(function (req, res, next) {
  console.log(req._parsedUrl.path, "----<<<<<<<<<<<Current ");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-Requested-With,content-type"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
app.use(cors());

app.use("/api", paymentRoute);
app.use("/user", require("./Userroutes"));
app.use("/enquiry", require("./EnquiryRoute"));
app.use("/excel", require("./ExcelRoutes"));

// app.listen, () => {
app.listen(process.env.PORT || 5000, () => {
  console.log(`App is running at 5000 port`);
});
