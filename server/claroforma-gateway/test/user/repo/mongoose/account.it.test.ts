import * as dotenv from "dotenv";
import * as connection from "../../../../src/persistence/MongoConnection";

import {IAccount, accountRepo} from "../../../../src/user/repo/mongoose/Account";

dotenv.config({ path:  ".env.test" });

connection.connect(process.env.MONGODB_URI, undefined, undefined);

describe("user/repo/mongoose", () => {
  describe("Account", () => {
    it("should save, retrieve and delete", async () => {
      let account: IAccount = {
        username: "Test2",
        password: "pwd",
        familyName: "Smith",
        givenName: "John"
      };
      const saved = await accountRepo.create(account);
      const retrieved = await accountRepo.findOne({ username: "Test2"});
      
      // console.log( JSON.stringify(retrieved));
      expect(retrieved.uid).toBeDefined();
      expect(retrieved.createdAt).toBeDefined();
      expect(retrieved.modifiedAt).toBe(undefined);
      expect(retrieved.familyName).toBe("Smith");

      await accountRepo.delete({username: retrieved.username})
      
    });
  });
});
