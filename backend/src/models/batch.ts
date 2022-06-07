import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { phase, phaseId } from './phase';

export interface batchAttributes {
  id: number;
  batch_id: string;
  current_phase?: number;
  last_change: Date;
}

export type batchPk = "id";
export type batchId = batch[batchPk];
export type batchOptionalAttributes = "id" | "current_phase" | "last_change";
export type batchCreationAttributes = Optional<batchAttributes, batchOptionalAttributes>;

export class batch extends Model<batchAttributes, batchCreationAttributes> implements batchAttributes {
  id!: number;
  batch_id!: string;
  current_phase?: number;
  last_change!: Date;

  // batch belongsTo phase via current_phase
  current_phase_phase!: phase;
  getCurrent_phase_phase!: Sequelize.BelongsToGetAssociationMixin<phase>;
  setCurrent_phase_phase!: Sequelize.BelongsToSetAssociationMixin<phase, phaseId>;
  createCurrent_phase_phase!: Sequelize.BelongsToCreateAssociationMixin<phase>;

  static initModel(sequelize: Sequelize.Sequelize): typeof batch {
    return sequelize.define('batch', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    batch_id: {
      type: DataTypes.STRING(36),
      allowNull: false,
      unique: "batch_id"
    },
    current_phase: {
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'phases',
        key: 'id'
      }
    },
    last_change: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: Sequelize.Sequelize.fn('current_timestamp')
    }
  }, {
    tableName: 'batch',
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
        name: "batch_id",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "batch_id" },
        ]
      },
      {
        name: "current_phase",
        using: "BTREE",
        fields: [
          { name: "current_phase" },
        ]
      },
    ]
  }) as typeof batch;
  }
}
