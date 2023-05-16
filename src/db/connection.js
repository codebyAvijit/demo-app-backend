const mongoose = require("mongoose");
require("dotenv").config();
mongoose
  .connect(process.env.mongoDBUrl, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connnection Successfull");
  })
  .catch(() => {
    console.log("Connnection Terminated");
  });

module.exports = mongoose;
