import { TypeUID, IEntityBase } from "../foundation/model/IEntityBase";

import { IAccount, accountRepo, IAuth, authRepo, IProfile, profileRepo } from "./repo/index";
import { IUserRecords } from "./IUserRecords";

export class UserService {

    constructor() {

    }


    async signUp(userRecords: IUserRecords): Promise<IUserRecords> {

        const existingUser = await this.findByEmail(userRecords.profile.email);
        if (existingUser) {
            // TODO: Verify that the auth provider/id are same.
            if (userRecords.auths && userRecords.auths.length > 0) {
                const matchingAuth = userRecords.auths.find( (auth) => {
                    return auth.provider == userRecords.auths[0].provider
                        && auth.providerAccountId == userRecords.auths[0].providerAccountId;
                });
                return existingUser;
            }
            throw {
                error: {
                    message: "User already registered with different id"
                }
            };
        }
        const account = await accountRepo.create(userRecords.account);
        userRecords.auths[0].accountUid = account.uid;
        const auth = await authRepo.create(userRecords.auths[0]);
        userRecords.profile.accountUid = account.uid;
        const profile = await profileRepo.create(userRecords.profile);
        return userRecords;
    }

    async linkAccount(userRecords: IUserRecords): Promise<IUserRecords> {
        userRecords.auths[0].accountUid = userRecords.account.uid;
        const auth = await authRepo.create(userRecords.auths[0]);
        // Ignoring the profile from newly linked account
        return userRecords;
    }

    async findByEmail(email: string): Promise<IUserRecords> {

        const profile = await profileRepo.findByEmail(email);
        let account: IAccount;
        let auths: Array<IAuth>;

        if (!profile) {
            return undefined;
        }

        account = await accountRepo.findByUid(profile.accountUid);
        auths = await authRepo.findByAccountUid(profile.accountUid);

        const userRecords: IUserRecords = {
            account: account,
            auths: auths,
            profile: profile
        };

        return userRecords;
    }

}

export const userService = new UserService();