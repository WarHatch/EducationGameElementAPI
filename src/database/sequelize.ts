import Sequelize from "sequelize";
import clickDataModel from "./models/ClickData";
import sessionModel from "./models/Session";

const DATABASE_NAME = "game-data-registry";
const USERNAME = "root";
const PASSWORD = "root";
const HOST = "localhost";
const DIALECT = "mysql";

const sequelize = new Sequelize.Sequelize(
  DATABASE_NAME, USERNAME, PASSWORD,
  {
    host: HOST, dialect: DIALECT, pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
  }
);

const ClickData = clickDataModel(sequelize, Sequelize)
const Session = sessionModel(sequelize, Sequelize, ClickData)

sequelize.sync({ force: false })
  .then(() => {
    console.log("Database & tables created!")
  })

export default {
  ClickData,
  Session
}
