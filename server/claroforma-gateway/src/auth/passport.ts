
import * as passport from "passport";
import * as request from "request";
import * as passportLocal from "passport-local";
import * as passportFacebook from "passport-facebook";
import * as _ from "lodash";

import { IUserRecords } from "../user/IUserRecords";
import { userService } from "../user/UserService";
import { Request, Response, NextFunction } from "express";

import * as facebookutils from "./facebook-utils";

const LocalStrategy = passportLocal.Strategy;
const FacebookStrategy = passportFacebook.Strategy;

passport.serializeUser<any, any>((user, done) => {
  done(undefined, user.id);
});

/*
passport.deserializeUser((id, done) => {
  userService.findByEmail(id)
  .then( (account) => {
    done(undefined, account);
  })
  .catch( (err) => {
    done(err, undefined);
  });
});*/


/**
 * Sign in using Email and Password.
 */
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  /*
  authRepo.f({ email: email.toLowerCase() }, (err, user: any) => {
    if (err) { return done(err); }
    if (!user) {
      return done(undefined, false, { message: `Email ${email} not found.` });
    }
    user.comparePassword(password, (err: Error, isMatch: boolean) => {
      if (err) { return done(err); }
      if (isMatch) {
        return done(undefined, user);
      }
      return done(undefined, false, { message: "Invalid email or password." });
    });
  });
  */
}));


/**
 * Sign in with Facebook.
 */
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_ID,
  clientSecret: process.env.FACEBOOK_SECRET,
  callbackURL: "/auth/facebook/callback",
  profileFields: [
    "name", "about", "email", "age_range", "birthday", "gender", "languages", "hometown"
    , "education", "interested_in", "work", "quotes", "website"
    , "link", "locale", "timezone", "updated_time"
    ],
  passReqToCallback: true
}, (req: any, accessToken, refreshToken, profile, done) => {
  console.log( JSON.stringify(profile, undefined, 2));
  if (req.user) {
    // User already authenticated, link new SNS account
    const userRecords = facebookutils.translateProfileToUser(profile);
    userRecords.account = req.user;
    userService.linkAccount(userRecords )
    .then( (userRecords) => {
      done(userRecords);
    })
    .catch( (err: any) => {
      done(err);
    });
  } else {
    // User unauthenticated, crate new user from SNS profile
    // Verify email first
    const userRecords = facebookutils.translateProfileToUser(profile);
    userService.signUp(userRecords)
    .then( (userRecords) => {
      done(userRecords);
    })
    .catch( (err: any) => {
      done(err);
    });

  }
}));

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

/**
 * Authorization Required middleware.
 */
export let isAuthorized = (req: Request, res: Response, next: NextFunction) => {
  const provider = req.path.split("/").slice(-1)[0];

  if (_.find(req.user.tokens, { kind: provider })) {
    next();
  } else {
    res.redirect(`/auth/${provider}`);
  }
};

export let strategies = ["facebook"];