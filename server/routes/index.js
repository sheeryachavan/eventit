const userRoutes = require("./users_r");

const constructorMethod = app => {

    app.use("/event.it/api/user", userRoutes);

    app.use("*", (req, res) => {
        res.redirect("http://localhost:3000/event.it");
      });
};

module.exports = constructorMethod;  