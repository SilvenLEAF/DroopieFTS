import type { Sequelize } from "sequelize";
import { File as _File } from "./file";
import type { FileAttributes, FileCreationAttributes } from "./file";

export {
  _File as File,
};

export type {
  FileAttributes,
  FileCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const File = _File.initModel(sequelize);


  return {
    File: File,
  };
}
