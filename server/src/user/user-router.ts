"use strict";

import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import {Router, Response, Request, NextFunction} from "express";

import { userService } from "./UserService";

const userRouter: Router = Router();

/**
 * GET /api/facebook
 * Facebook API example.
 */
userRouter.get("/:email", (req: Request, res: Response, next: NextFunction) => {
  // const token = req.user.tokens.find((token: any) => token.kind === "facebook");
  userService.findByEmail( req.params.email)
  .then( (user) => {
    res.status(200).send(user);
  });
});


/**
 * GET /api/facebook
 * Facebook API example.
 */
userRouter.get("/facebook", (req: Request, res: Response, next: NextFunction) => {
  const token = req.user.tokens.find((token: any) => token.kind === "facebook");
  graph.setAccessToken(token.accessToken);
  graph.get(`${req.user.facebook}?fields=id,name,email,first_name,last_name,gender,link,locale,timezone`, (err: Error, results: graph.FacebookUser) => {
    if (err) { return next(err); }
    res.status(200).send(results);
  });
});

export {userRouter};