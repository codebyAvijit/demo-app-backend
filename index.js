const express = require("express");
const cors=require("cors")
const app = express();

const port = process.env.PORT || 8000;

const dataRoute = require("./src/router/dataRouter");
require("./src/db/connection");
app.use(cors())

// app.get("/", (req, res) => {
//   res.send("Hello from express");
// });

app.use(express.json());
app.use("/api/data", dataRoute);

app.listen(port, () => {
  console.log(`The server is listening at port ${port}`);
});
