import { TypeUID, IEntityBase } from "../foundation/model/IEntityBase";

import { IUserRecords } from "./IUserRecords";
import { IAccount, accountRepo, IAuth, authRepo, IProfile, profileRepo } from "./repo/index";
import { ElasticSearchConnection } from "../persistence/ElasticSearchConnection";

export class UserService {

    public static readonly INDEX_NAME: string = "user";
    public static readonly TYPE_NAME: string = "serinfo";

    constructor() {

    }


    async signUp(userRecords: IUserRecords): Promise<IUserRecords> {

        const existingUser = await this.findByEmail(userRecords.profile.email);
        if (existingUser) {
            // TODO: Verify that the auth provider/id are same.
            if (userRecords.auths && userRecords.auths.length > 0) {
                const matchingAuth = userRecords.auths.find((auth) => {
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

    // Search functionalites:

    async indexUser(user: IUserRecords, refresh = false): Promise<any> {
        const esclient = ElasticSearchConnection.getClient();

        return new Promise((resolve, reject) => {
            esclient.create({
                index: UserService.INDEX_NAME,
                type: UserService.TYPE_NAME,
                id: user.account.uid,
                body: user,
                refresh: refresh
            }, function (error, response) {
                if (error) {
                    return reject(error);
                }
                return resolve(user);
            });
        });
    }

    async searchUser(criteria: any): Promise<any> {
        const esclient = ElasticSearchConnection.getClient();

        return new Promise((resolve, reject) => {
            esclient.search({
                index: UserService.INDEX_NAME,
                type: UserService.TYPE_NAME,
                body: criteria
            }, function (error, response) {
                if (error) {
                    return reject(error);
                }
                return resolve(response);
            });
        });
    }

    async searchUserByUsername(username: string): Promise<any> {

        const criteria = {
            "query": {
                "bool": {
                    "must": {
                        "match_all": {}
                    },
                    "filter": {
                        "term": {
                            "account.username": username
                        }
                    }
                }
            }
        };
        return this.searchUser(criteria);
    }


    async deleteUserIndex(uid: TypeUID): Promise<any> {
        const esclient = ElasticSearchConnection.getClient();

        return new Promise((resolve, reject) => {
            esclient.delete({
                index: UserService.INDEX_NAME,
                type: UserService.TYPE_NAME,
                id: uid
            }, function (error, response) {
                if (error) {
                    return reject(error);
                }
                return resolve(response);
            });
        });
    }

}

export const userService = new UserService();