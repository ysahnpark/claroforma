import * as dotenv from "dotenv";

import {ElasticSearchConnection} from "../../src/persistence/ElasticSearchConnection";
import {userService} from "../../src/user/UserService";

let test_user = require("../auth/sample_facebook_to_user.json");

dotenv.config({ path:  ".env.test" });

test_user.account.uid = "test-1234";

ElasticSearchConnection.connect(process.env.ELASTICSEARCH_URI, {});

describe("user", () => {
  describe("UserService", () => {
    it("should index and search", async () => {
      const saved = await userService.indexUser(test_user, true);
      const result = await userService.searchUserByUsername(test_user.account.username);
      
      // console.log( JSON.stringify(saved, undefined, 4));

      // console.log( "***" + JSON.stringify(result, undefined, 4));

      expect(result.hits.hits[0]._source.account).toBeDefined();
      expect(result.hits.hits[0]._source.account.username).toBe("ysahn@test.com");
      expect(result.hits.hits[0]._source.profile).toBeDefined();
      const deleted = await userService.deleteUserIndex(test_user.account.uid);
      
    });
  });
});
