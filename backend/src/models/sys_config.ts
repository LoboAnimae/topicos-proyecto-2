import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';

export interface sys_configAttributes {
  variable: string;
  value?: string;
  set_time: Date;
  set_by?: string;
}

export type sys_configPk = "variable";
export type sys_configId = sys_config[sys_configPk];
export type sys_configOptionalAttributes = "value" | "set_time" | "set_by";
export type sys_configCreationAttributes = Optional<sys_configAttributes, sys_configOptionalAttributes>;

export class sys_config extends Model<sys_configAttributes, sys_configCreationAttributes> implements sys_configAttributes {
  variable!: string;
  value?: string;
  set_time!: Date;
  set_by?: string;


  static initModel(sequelize: Sequelize.Sequelize): typeof sys_config {
    return sequelize.define('sys_config', {
    variable: {
      type: DataTypes.STRING(128),
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING(128),
      allowNull: true
    },
    set_time: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    },
    set_by: {
      type: DataTypes.STRING(128),
      allowNull: true
    }
  }, {
    tableName: 'sys_config',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "variable" },
        ]
      },
    ]
  }) as typeof sys_config;
  }
}
