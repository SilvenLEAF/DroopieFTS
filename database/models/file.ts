import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface FileAttributes {
  fileId: number;
  dropboxFileId: string;
  fileName: string;
  filePath: string;
  url: string;
  dropboxUpdatedAt: Date;
  visitCount: number;
  content?: string;
}

export type FilePk = "dropboxFileId";
export type FileId = File[FilePk];
export type FileOptionalAttributes = "fileId" | "visitCount" | "content";
export type FileCreationAttributes = Optional<FileAttributes, FileOptionalAttributes>;

export class File extends Model<FileAttributes, FileCreationAttributes> implements FileAttributes {
  fileId!: number;
  dropboxFileId!: string;
  fileName!: string;
  filePath!: string;
  url!: string;
  dropboxUpdatedAt!: Date;
  visitCount!: number;
  content?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof File {
    return File.init({
    fileId: {
      autoIncrement: true,
      type: DataTypes.BIGINT,
      allowNull: false,
      field: 'file_id'
    },
    dropboxFileId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      field: 'dropbox_file_id'
    },
    fileName: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'file_name'
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'file_path'
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    dropboxUpdatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'dropbox_updated_at'
    },
    visitCount: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 0,
      field: 'visit_count'
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'files',
    schema: 'hris',
    timestamps: false,
    indexes: [
      {
        name: "files_pkey",
        unique: true,
        fields: [
          { name: "dropbox_file_id" },
        ]
      },
    ]
  });
  }
}
