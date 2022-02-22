import { Sequelize } from 'sequelize-typescript'
import { generateMigration } from "sequelize-typescript-model-migration";
import path from "path";

const env = process.env.NODE_ENV || 'development'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./config/config.json')[env]

const sequelize = new Sequelize(config.database, config.username, config.password, {
  ...config,
  models: [__dirname + '/src/models/*.model.ts'],
  modelMatch: (filename, member) =>
    filename.substring(0, filename.indexOf('.model')).replace('-', '') === member.toLowerCase()
})
// generateMigration(sequelize, {
//   migrationName: "my-migration",
//   outDir: path.join(__dirname, "./migrations"),
//   snapshotDir: path.join(__dirname, "./snapshots"),
// });

export default sequelize
