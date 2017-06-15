import * as bcrypt from "bcrypt-nodejs";
import * as crypto from "crypto";
import * as mongoose from "mongoose";

import * as uuidv4 from "uuid/v4";
import { TypeUID, IEntityBase } from "../../../foundation/model/IEntityBase";
import { extendSchemaDefBase, MongooseRepositoryBase } from "../../../foundation/repository/MongooseRepositoryBase";
import * as profile from  "../../IProfile";

export import IProfile = profile.IProfile;

export type IProfileModel = IProfile & mongoose.Document & {
};

const profileSchema = new mongoose.Schema( extendSchemaDefBase({
  email: { type: String, unique: true },
  accountUid: { type: String, unique: true, required: true },
  synopsys: String,
  description: String,

  hometown: String,
  location: {
    countryCode: String,
    province: String,
    city: String,
    address: String,
    postalCode: String
  },

  education: [
    {
      institution: String,
      location: String,
      degree: String,
      field: String,
      description: String,
      activities: String,
      fromDate: String,
      toDate: String
    }
  ],
  expertise: [
    {
      area: String,
      level: Number,
    }
  ],
  experiences: [
    {
      institution: String,
      location: String,
      title: String,
      description: String,
      achievements: String,
      fromDate: String,
      toDate: String
    }
  ],
  accomplishments: [
    {
      type: String, // certification, awards, recognition, patents, papers, project
      title: String,
      location: String,
      description: String,
      fromDate: String,
      toDate: String,
      url: String,
    }
  ],
  interests: Array,
  languages: Array,
  gender: String,
  website: String
}), { timestamps: true });


/**
 * Pre fooks to populate data before insert.
 * TODO: factor out
 */
profileSchema.pre("save", function save(next) {
  const entity = this;
  return next();
});

profileSchema.pre("update", function update(next) {
  const entity = this;
  next();
});


const ProfileModel = mongoose.model<IProfileModel>("ProfileModel", profileSchema);

class ProfileRepo extends MongooseRepositoryBase<IProfile, IProfileModel>  {

  constructor(schemaModel: mongoose.Model<mongoose.Document>,  createModel: (entity: IProfile) => mongoose.Document & IProfile) {
    super(schemaModel, createModel);
  }

  findByAccountUid(accountUid: String, providerAccountId: string): Promise<IProfileModel> {
    return this.findOne({ accountUid: accountUid});
  }

  findByEmail(email: String): Promise<IProfileModel> {
    return this.findOne({ email: email.toLowerCase() });
  }

}

// Factory function
function createModel(entity: IProfile): mongoose.Document & IProfile {
  const myModel = new ProfileModel();
  Object.assign(myModel, entity);
  return myModel;
}

export const profileRepo = new ProfileRepo(ProfileModel, createModel);