import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface userAttributes {
  id: number;
  username: string;
  password: any;
  wallet: string;
  permissions: number;
}

export type userPk = "id";
export type userId = user[userPk];
export type userOptionalAttributes = "id" | "permissions";
export type userCreationAttributes = Optional<userAttributes, userOptionalAttributes>;

export class user extends Model<userAttributes, userCreationAttributes> implements userAttributes {
  id!: number;
  username!: string;
  password!: any;
  wallet!: string;
  permissions!: number;


  static initModel(sequelize: Sequelize.Sequelize): typeof user {
    return sequelize.define('user', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: "username"
    },
    password: {
      type: DataTypes.BLOB,
      allowNull: false
    },
    wallet: {
      type: DataTypes.CHAR(64),
      allowNull: false
    },
    permissions: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "username",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "username" },
        ]
      },
    ]
  }) as typeof user;
  }
}
