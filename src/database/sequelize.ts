import Sequelize from "sequelize";
import clickDataModel from "./models/ClickData";
import sessionModel from "./models/Session";
import sessionConfigModel from "./models/SessionConfig";
import lessonModel from "./models/Lesson";
import config from "../config"

// tslint:disable: object-literal-sort-keys

// @ts-ignore // FIXME: missing production values
const { databaseName, username, password, host, dialect, pool } = config.databaseConfig;

const sequelize = new Sequelize.Sequelize(
  databaseName, username, password,
  {
    dialect, host, pool
  }
);

const ClickData = clickDataModel(sequelize, Sequelize)
const SessionConfig = sessionConfigModel(sequelize, Sequelize)
const Session = sessionModel(sequelize, Sequelize,
  {
    ClickData,
    SessionConfig,
  }
)
const Lesson = lessonModel(sequelize, Sequelize,
  {
    Session,
  }
)

sequelize.sync({ force: false })
  .then(() => {
    console.log("Database & tables created!")
  })

export default {
  ClickData,
  SessionConfig,
  Session,
  Lesson,
}
