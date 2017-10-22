import * as uuidv4 from "uuid/v4";
import * as mongoose from "mongoose";
import { TypeUID, IEntityBase } from "../model/IEntityBase";

export const schemaDefBase = {
  sid: Number,
  uid: { type: String, unique: true, required: true },
  createdByUid: { type: String },
  createdAt: { type: Date, required: true },
  modifiedByUid: String,
  modifiedAt: Date
};

export function extendSchemaDefBase(schemaDef: any) {
  return Object.assign({}, schemaDefBase, schemaDef);
}

function onCreate(entity: IEntityBase) {
    if (!entity.uid) {
        entity.uid = uuidv4();
    }
    if (!entity.createdAt) {
        entity.createdAt = new Date();
    }
}

function onUpdate(entity: IEntityBase) {
    if (!entity.modifiedAt) {
        entity.modifiedAt = new Date();
    }
}

// Inspired by https://gist.github.com/brennanMKE/ee8ea002d305d4539ef6
export class MongooseRepositoryBase <TEntity extends IEntityBase, T extends mongoose.Document> {

  private _model: mongoose.Model<mongoose.Document>;
  private _createModel: (entity: TEntity) => mongoose.Document & TEntity;

  constructor(schemaModel: mongoose.Model<mongoose.Document>,  createModel: (entity: TEntity) => mongoose.Document & TEntity) {
    this._createModel = createModel;
    this._model = schemaModel;
  }

  // TODO: consider returning Promise<TEntity>
  create(entity: TEntity): Promise<T> {
    onCreate(entity);
    const model = this._createModel(entity);
    return new Promise((resolve, reject) => {
      this._model.create(model, (err: any, resultDoc: T) => {
        if (err) {
          return reject (err);
        }
        return resolve(resultDoc);
      });
    });
  }

  update(uid: TypeUID, entity: TEntity): Promise<T> {
    onUpdate(entity);
    return new Promise((resolve, reject) => {
      this._model.update({uid: uid}, entity, { multi: false }, (err: any, resultDoc: T) => {
        if (err) {
          return reject (err);
        }
        return resolve(resultDoc);
      });
    });
  }

  find(criteria: any): Promise< Array<T> > {
    return new Promise((resolve, reject) => {
      this._model.find(criteria, (err, accounts: Array<T>) => {
        if (err) {
          return reject (err);
        }
        return resolve(accounts);
      });
    });
  }

  findOne(criteria: any): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findOne(criteria, (err, account: T) => {
        if (err) {
          return reject (err);
        }
        return resolve(account);
      });
    });
  }

  delete(criteria: any): Promise<number> {
    return new Promise((resolve, reject) => {
      // TODO: AccountMode.remove is not accepting cb(any, result: any)
      this._model.remove(criteria, (err) => {
        if (err) {
          return reject (err);
        }
        return resolve(1);
      });
    });
  }

  findByUid(uid: TypeUID): Promise<T> {
    return new Promise((resolve, reject) => {
      this._model.findOne({ uid: uid }, (err, account: T) => {
        if (err) {
          return reject (err);
        }
        return resolve(account);
      });
    });
  }

}