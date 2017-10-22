import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

import * as _ from "lodash";
import { TypeUID, IEntityBase } from "../../../foundation/model/IEntityBase";
import { extendSchemaDefBase, MongooseRepositoryBase } from "../../../foundation/repository/MongooseRepositoryBase";
import * as account from "../../IAccount";

export import IAccount = account.IAccount;

export type IAccountModel = account.IAccount & mongoose.Document & {
  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void,
  gravatar: (size: number) => string
};

// Extend from base schema definition

const accountSchema = new mongoose.Schema(extendSchemaDefBase({
  username: { type: String, unique: true },
  password: String,

  verifiedInd: Boolean,
  passwordResetToken: String,
  passwordResetExpires: Date,

  givenName: { type: String, required: true },
  familyName: { type: String, required: true },
  middleName: String,
  pictureUri: String,

  dateOfBirth: Date,

  // preferences
  locale: String,
  timezone: String,
}), { timestamps: true });

/**
 * Password hash middleware.
 */
accountSchema.pre("save", function save(next) {
  const entity = this;
  if (!entity.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(entity.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      entity.password = hash;
      next();
    });
  });
});

accountSchema.pre("update", function save(next) {
  const entity = this;
  next();
});

accountSchema.methods.comparePassword = function(candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error , isMatch: boolean) => {
    cb(err, isMatch);
  });
};


/**
 * Helper method for getting user's gravatar.
 */
accountSchema.methods.gravatar = function(size: number) {
  if (!size) {
    size = 200;
  }
  if (!this.email) {
    return `https://gravatar.com/avatar/?s=${size}&d=retro`;
  }
  const md5 = crypto.createHash("md5").update(this.email).digest("hex");
  return `https://gravatar.com/avatar/${md5}?s=${size}&d=retro`;
};

export const AccountModel = mongoose.model<IAccountModel>("Account", accountSchema);

export class AccountRepo extends MongooseRepositoryBase<IAccount, IAccountModel> {

  constructor(schemaModel: mongoose.Model<mongoose.Document>,  createModel: (entity: IAccount) => mongoose.Document & IAccount) {
    super(schemaModel, createModel);
  }

  findByUsername(username: String): Promise<IAccountModel> {
    return this.findOne({ username: username.toLowerCase() });
  }

}


// Factory function
function createModel(entity: IAccount): mongoose.Document & IAccount {
  return Object.assign(new AccountModel(), entity);
}

export const accountRepo = new AccountRepo(AccountModel, createModel);