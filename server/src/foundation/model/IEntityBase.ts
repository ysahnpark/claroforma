import * as uuidv4 from "uuid/v4";

export type TypeUID = string;

export interface IEntityBase {
    sid?: number;
    uid?: TypeUID;
    createdByUid?: TypeUID;
    createdAt?: Date;
    modifiedByUid?: TypeUID;
    modifiedAt?: Date;
}

export function onCreate(entity: IEntityBase) {
    if (!entity.uid) {
        entity.uid = uuidv4();
    }
    if (!entity.createdAt) {
        entity.createdAt = new Date();
    }
}

export function onUpdate(entity: IEntityBase) {
    if (!entity.modifiedAt) {
        entity.modifiedAt = new Date();
    }
}