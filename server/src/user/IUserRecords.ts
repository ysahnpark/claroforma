import {IAccount} from "./IAccount";
import {IAuth} from "./IAuth";
import {IProfile} from "./IProfile";

export interface IUserRecords {

  account: IAccount;
  auths?: Array<IAuth>;
  profile?: IProfile;
}