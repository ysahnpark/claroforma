"use strict";

import * as jwt from "jsonwebtoken";
import * as passport from "passport";
import {Router, Response, Request, NextFunction} from "express";

const authRouter: Router = Router();

authRouter.get(
  "/facebook",
  passport.authenticate(
    "facebook",
    { scope: ["email", "user_about_me", "public_profile", "user_education_history", "user_hometown", "user_website", "user_work_history"] }
  )
);

authRouter.get("/facebook/callback", passport.authenticate("facebook", { failureRedirect: "/login" }), (req, res) => {
  // Callback completed, return with JWT token wrapped in cookie
  const payload = {id: req.user.account.uid};
  const token = jwt.sign(payload, "jwtOptions.secretOrKey");

  res.cookie("cf-token" , token).redirect("/");
});

export {authRouter};