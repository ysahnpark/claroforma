/**
 * Module dependencies.
 */
import * as express from "express";
import * as compression from "compression";  // compresses requests
import * as session from "express-session";
import * as bodyParser from "body-parser";
import * as errorHandler from "errorhandler";
import * as lusca from "lusca";
import * as dotenv from "dotenv";
import * as flash from "express-flash";
import * as path from "path";
import * as passport from "passport";
import * as connection from "./persistence/MongoConnection";

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
const ENV_NAME = process.env.ENV_NAME || ".env.example";
console.log("{\"envpath\"=\"" + ENV_NAME + "\"}");
dotenv.config({ path: ENV_NAME });

/**
 * API keys and Passport configuration.
 */
import * as passportConfig from "./auth/passport";
console.log("{\"passportConfig.strategies\"=" + JSON.stringify(passportConfig.strategies) + "}");


/**
 * Controllers (route handlers).
 */
import { siteRouter } from "./site/site-router";
import { authRouter } from "./auth/auth-router";
import { userRouter } from "./user/user-router";

/**
 * Create Express server.
 */
const app = express();

connection.connect(process.env.MONGODB_URI, undefined, undefined);


/**
 * Express configuration.
 */

// Connfigure Handlebars as template engine
const exphbs = require("express-handlebars");
app.engine(".hbs", exphbs({defaultLayout: "main", extname: ".hbs"}));
app.set("view engine", ".hbs");
app.set("views", path.join(__dirname, "../views"));

app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
console.log("process.env.SESSION_SECRET=" + process.env.SESSION_SECRET);
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
app.use(express.static(path.join(__dirname, "public"), { maxAge: 31557600000 }));

/**
 * API examples routes.
 */
app.use("", siteRouter);

app.use("/profiles", userRouter);

/**
 * OAuth authentication routes. (Sign in)
 */
// app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["email", "public_profile"] }));
// app.get("/auth/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
//   // Callback completed, return with JWT token wrapped in cookie
//   res.redirect("/");
// });

app.use("/auth", authRouter);


/**
 * Error Handler. Provides full stack - remove for production
 */
app.use(errorHandler());

/**
 * Start Express server.
 */
app.listen(app.get("port"), () => {
  console.log(("  App is running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
  console.log("  Press CTRL-C to stop\n");
});

module.exports = app;