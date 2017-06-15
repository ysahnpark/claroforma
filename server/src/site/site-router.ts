"use strict";

import * as async from "async";
import * as request from "request";
import * as graph from "fbgraph";
import {Router, Response, Request, NextFunction} from "express";

const siteRouter: Router = Router();

/**
 * GET /
 * Root index
 */
siteRouter.get("/", (req: Request, res: Response) => {
    res.render("home", {
    title: "Home"
  });
});

export {siteRouter};