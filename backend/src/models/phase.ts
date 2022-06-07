import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { batch, batchId } from './batch';

export interface phaseAttributes {
  id: number;
  name: string;
  is_end?: number;
}

export type phasePk = "id";
export type phaseId = phase[phasePk];
export type phaseOptionalAttributes = "id" | "is_end";
export type phaseCreationAttributes = Optional<phaseAttributes, phaseOptionalAttributes>;

export class phase extends Model<phaseAttributes, phaseCreationAttributes> implements phaseAttributes {
  id!: number;
  name!: string;
  is_end?: number;

  // phase hasMany batch via current_phase
  batches!: batch[];
  getBatches!: Sequelize.HasManyGetAssociationsMixin<batch>;
  setBatches!: Sequelize.HasManySetAssociationsMixin<batch, batchId>;
  addBatch!: Sequelize.HasManyAddAssociationMixin<batch, batchId>;
  addBatches!: Sequelize.HasManyAddAssociationsMixin<batch, batchId>;
  createBatch!: Sequelize.HasManyCreateAssociationMixin<batch>;
  removeBatch!: Sequelize.HasManyRemoveAssociationMixin<batch, batchId>;
  removeBatches!: Sequelize.HasManyRemoveAssociationsMixin<batch, batchId>;
  hasBatch!: Sequelize.HasManyHasAssociationMixin<batch, batchId>;
  hasBatches!: Sequelize.HasManyHasAssociationsMixin<batch, batchId>;
  countBatches!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof phase {
    return sequelize.define('phase', {
    id: {
      autoIncrement: true,
      type: DataTypes.TINYINT.UNSIGNED,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(191),
      allowNull: false,
      unique: "name"
    },
    is_end: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    tableName: 'phases',
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
        name: "name",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "name" },
        ]
      },
    ]
  }) as typeof phase;
  }
}
