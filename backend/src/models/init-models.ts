import type { Sequelize } from "sequelize";
import { batch as _batch } from "./batch";
import type { batchAttributes, batchCreationAttributes } from "./batch";
import { phase as _phase } from "./phase";
import type { phaseAttributes, phaseCreationAttributes } from "./phase";
import { sys_config as _sys_config } from "./sys_config";
import type { sys_configAttributes, sys_configCreationAttributes } from "./sys_config";
import { user as _user } from "./user";
import type { userAttributes, userCreationAttributes } from "./user";

export {
  _batch as batch,
  _phase as phase,
  _sys_config as sys_config,
  _user as user,
};

export type {
  batchAttributes,
  batchCreationAttributes,
  phaseAttributes,
  phaseCreationAttributes,
  sys_configAttributes,
  sys_configCreationAttributes,
  userAttributes,
  userCreationAttributes,
};

export function initModels(sequelize: Sequelize) {
  const batch = _batch.initModel(sequelize);
  const phase = _phase.initModel(sequelize);
  const sys_config = _sys_config.initModel(sequelize);
  const user = _user.initModel(sequelize);

  batch.belongsTo(phase, { as: "current_phase_phase", foreignKey: "current_phase"});
  phase.hasMany(batch, { as: "batches", foreignKey: "current_phase"});

  return {
    batch: batch,
    phase: phase,
    sys_config: sys_config,
    user: user,
  };
}
