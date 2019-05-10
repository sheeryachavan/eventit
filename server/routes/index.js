const userRoutes = require("./users_r");

const constructorMethod = app => {

    app.use("/eventit/user", userRoutes);

    app.use("*", (req, res) => {
        res.redirect("http://localhost:3000/eventit");
      });
};

module.exports = constructorMethod;  