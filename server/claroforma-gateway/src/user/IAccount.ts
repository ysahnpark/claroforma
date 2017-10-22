import { TypeUID, IEntityBase } from "../foundation/model/IEntityBase";

export interface IAccount extends IEntityBase {
  username: string;
  password: string;

  verifiedInd?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;

  givenName: string;
  familyName: string;
  middleName?: string;
  pictureUri?: string;

  dateOfBirth?: Date;

  // preferences
  locale?: string;
  timezone?: string;

}