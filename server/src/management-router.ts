"use strict";

import * as async from "async";
import * as request from "request";
import {Router, Response, Request, NextFunction} from "express";

const managementRouter: Router = Router();

/**
 * GET /api/facebook
 * Facebook API example.
 */
managementRouter.get("/info", (req: Request, res: Response, next: NextFunction) => {
  const info = {
    name : "Claroaprende"
  };
  res.status(200).send(info);
});

export {managementRouter};
