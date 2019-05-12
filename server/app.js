const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const configRoutes = require("./routes");
const logger = require('morgan');
var cors = require('cors')

const app = express();
app.use(cors())

app.use(logger('dev'))

app.use(bodyParser.json());
app.use(cookieParser());


configRoutes(app);
app.listen(3001, () => {
    console.log("We've now got a server!");
    console.log("Event.it routes will be running on http://localhost:3001");
  });