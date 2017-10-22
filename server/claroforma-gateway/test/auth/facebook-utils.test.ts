import * as facebookutils from "../../src/auth/facebook-utils";
let sample_facebook_profile = require("./sample_facebook_profile.json")
let sample_facebook_to_user = require("./sample_facebook_to_user.json")

describe("passport/facebook", () => {
  it("translateProfileToUser should parse", () => {
      let result = facebookutils.translateProfileToUser(sample_facebook_profile);

      //console.log( JSON.stringify(result, undefined, 2));
      expect(result).toEqual(sample_facebook_to_user);
  });
});