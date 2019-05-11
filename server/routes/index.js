const userRoutes = require("./users_firebase");
var cors = require('cors')

const constructorMethod = app => {

    app.use("/eventit/user", userRoutes);

    app.use("*",cors(), (req, res) => {
        res.redirect("http://localhost:3001/eventit");
      });
};

module.exports = constructorMethod;  