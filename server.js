const sslRedirect = require("heroku-ssl-redirect");
const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema");
const path = require("path");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3001;
const app = express();
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const usersRouter = require("./routes/users");
const galleryRouter = require("./routes/photos");
const employeesRouter = require("./routes/employees");
const calendarsRouter = require("./routes/calendars");
const commissionClaudia = require("./routes/commissions/claudia");
const commissionDiana = require("./routes/commissions/diana");
const commissionPaola = require("./routes/commissions/paola");
const commissionGroomer1 = require("./routes/commissions/groomer1");
// const waitListDays = require("./routes/waitListDays");

require("dotenv").config();

app.use(cors());
// Passport Config
require("./passport/passport")(passport);

app.use(sslRedirect());

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  app.locals.user = req.user;
  next();
});
app.use(morgan("dev"));
app.use(express.json());

//Passport Config
app.use(passport.initialize());
// app.use(passport.session());

// Requiring our models for syncing
var db = require("./models");

// Define API routes here
require("./routes/api-routes.js")(app);
require("./routes/clientsCambridge.js")(app);
app.use("/auth", usersRouter);
app.use("/auth", galleryRouter);
app.use("/auth", employeesRouter);
app.use("/schedule", calendarsRouter);
app.use("/auth", commissionClaudia);
app.use("/auth", commissionDiana);
app.use("/auth", commissionPaola);
app.use("/auth", commissionGroomer1);

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

db.sequelize.sync({ force: false }).then(function () {
  app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
  });
});

// app.listen(PORT, () => {
//     console.log(`🌎 ==> API server now on port ${PORT}!`);
//   });
