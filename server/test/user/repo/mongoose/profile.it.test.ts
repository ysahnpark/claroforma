import * as dotenv from "dotenv";
import * as connection from "../../../../src/persistence/MongoConnection";

import {IProfile, profileRepo} from "../../../../src/user/repo/mongoose/Profile";

dotenv.config({ path:  ".env.test" });

connection.connect(process.env.MONGODB_URI, undefined, undefined);

describe("user/repo/mongoose", () => {
  describe("Profile", () => {
    it("should save, retrieve and delete", async () => {
      let profile: IProfile = {
        username: "Test2",
        password: "pwd",
        familyName: "Smith",
        givenName: "John"
      };
      const saved = await profileRepo.create(profile);
      const retrieved = await profileRepo.findOne({ username: "Test2"});
      
      // console.log( JSON.stringify(retrieved));
      expect(retrieved.uid).toBeDefined();
      expect(retrieved.createdAt).toBeDefined();
      expect(retrieved.modifiedAt).toBe(undefined);
      expect(retrieved.familyName).toBe("Smith");

      await profileRepo.delete({username: retrieved.username})
      
    });
  });
});
