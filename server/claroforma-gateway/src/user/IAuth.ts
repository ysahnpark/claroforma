import { TypeUID, IEntityBase } from "../foundation/model/IEntityBase";

export type AuthToken = {
  accessToken: string,
  kind: string
};

export interface IAuth extends IEntityBase {
  accountUid: TypeUID;

  provider: string; // google, facebook, linkedin
  providerAccountId: string;
  tokens?: AuthToken[];

  rawProfile: any; // raw profile as provided
}