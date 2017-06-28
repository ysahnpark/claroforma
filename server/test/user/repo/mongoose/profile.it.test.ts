import * as dotenv from "dotenv";
import * as connection from "../../../../src/persistence/MongoConnection";

import {IProfile, profileRepo} from "../../../../src/user/repo/mongoose/Profile";

let test_profile = require("../../test_profile.json")

dotenv.config({ path:  ".env.test" });

connection.connect(process.env.MONGODB_URI, undefined, undefined);

describe("user/repo/mongoose", () => {
  describe("Profile", () => {
    it("should save, retrieve and delete", async () => {
      let profile: IProfile = test_profile;
      
      const saved = await profileRepo.create(profile);
      const retrieved = await profileRepo.findOne({ email: profile.email});
      
      // console.log( JSON.stringify(retrieved));
      expect(retrieved.uid).toBeDefined();
      expect(retrieved.createdAt).toBeDefined();
      expect(retrieved.modifiedAt).toBe(undefined);
      expect(retrieved.email).toBe("test.me@test.com");

      await profileRepo.delete({uid: retrieved.uid})
      
    });
  });
});
