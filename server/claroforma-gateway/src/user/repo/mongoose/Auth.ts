import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

import * as uuidv4 from "uuid/v4";
import { TypeUID, IEntityBase } from "../../../foundation/model/IEntityBase";
import { extendSchemaDefBase, MongooseRepositoryBase } from "../../../foundation/repository/MongooseRepositoryBase";
import * as auth from  "../../IAuth";

export import IAuth = auth.IAuth;

export type IAuthModel = IAuth & mongoose.Document & {
  comparePassword: (candidatePassword: string, cb: (err: any, isMatch: any) => {}) => void,
};

const authSchema = new mongoose.Schema(extendSchemaDefBase({
  accountUid: { type: String, unique: true, required: true },

  provider: { type: String, unique: true, required: true },
  providerAccountId: { type: String, unique: true, required: true },
  tokens: Array,

  rawProfile: mongoose.Schema.Types.Mixed, // raw profile as provided
}), { timestamps: true });

/**
 * Password hash middleware.
 */
authSchema.pre("save", function save(next) {
  const entity = this;
  if (!entity.isModified("password")) { return next(); }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }
    bcrypt.hash(entity.password, salt, undefined, (err: mongoose.Error, hash) => {
      if (err) { return next(err); }
      entity.password = hash;
      next();
    });
  });
});

authSchema.pre("update", function save(next) {
  const entity = this;
  next();
});

authSchema.methods.comparePassword = function(candidatePassword: string, cb: (err: any, isMatch: any) => {}) {
  bcrypt.compare(candidatePassword, this.password, (err: mongoose.Error , isMatch: boolean) => {
    cb(err, isMatch);
  });
};


const AuthModel = mongoose.model<IAuthModel>("Auth", authSchema);

class AuthRepo extends MongooseRepositoryBase<IAuth, IAuthModel> {

  constructor(schemaModel: mongoose.Model<mongoose.Document>,  createModel: (entity: IAuth) => mongoose.Document & IAuth) {
    super(schemaModel, createModel);
  }

  findByProvider(provider: String, providerAccountId: string): Promise<IAuthModel> {
    return this.findOne({ provider: provider, providerAccountId: providerAccountId});
  }

  findByAccountUid(accountUid: String): Promise< Array<IAuthModel> > {
    return this.find({ accountUid: accountUid});
  }
}

// Factory function
function createModel(entity: IAuth): mongoose.Document & IAuth {
  const myModel = new AuthModel();
  Object.assign(myModel, entity);
  return myModel;
}

export const authRepo = new AuthRepo(AuthModel, createModel);