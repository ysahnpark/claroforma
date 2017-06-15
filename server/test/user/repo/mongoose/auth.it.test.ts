import * as dotenv from "dotenv";
import * as connection from "../../../../src/persistence/MongoConnection";

import {IAuth, authRepo} from "../../../../src/user/repo/mongoose/Auth";

dotenv.config({ path:  ".env.test" });

connection.connect(process.env.MONGODB_URI, undefined, undefined);

describe("user/repo/mongoose", () => {
  describe("Auth", () => {
    it("should save, retrieve and delete", (done) => {
      let auth: IAuth = {
        accountUid: "abcd",
        provider: "geegle",
        providerAccountId: "1234567",
        rawProfile: {}
      };
      authRepo.create(auth)
      .then( (saved) => {
        return authRepo.findOne({ accountUid: "abcd"});
      })
      .then( (retrieved) => {
        // console.log( JSON.stringify(retrieved));
        expect(retrieved.provider).toBeDefined();
        expect(retrieved.providerAccountId).toBe("1234567");
        return retrieved;
      })
      .then( (retrieved) => {
        return authRepo.delete({accountUid: retrieved.accountUid})
        //return null;
      })
      .then( () => {
        done();
      })
      .catch( (error) => {
        console.log( JSON.stringify(error));
        done(error);
      });
    });
  });
});
