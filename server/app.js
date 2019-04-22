const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const configRoutes = require("./routes");

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

configRoutes(app);
app.listen(3000, () => {
    console.log("We've now got a server!");
    console.log("Event.it routes will be running on http://localhost:3000");
  });