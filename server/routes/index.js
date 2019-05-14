const userRoutes = require("./users_firebase");
const eventRoutes = require("./events_r");
var cors = require('cors')

const constructorMethod = app => {
    app.use("/eventit/user", userRoutes);
    app.use("/eventit/event", eventRoutes);
    /*
    app.use("*",cors(), (req, res) => {
        res.redirect("http://localhost:3001/eventit");
      });
      */
};
module.exports = constructorMethod;  
