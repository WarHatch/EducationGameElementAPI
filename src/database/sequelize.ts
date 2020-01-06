import Sequelize from "sequelize";
import clickDataModel from "./models/ClickData";
import sessionModel from "./models/Session";
import sessionConfigModel from "./models/SessionConfig";
import lessonModel from "./models/Lesson";

// tslint:disable: object-literal-sort-keys

const DATABASE_NAME = "game-data-registry";
const USERNAME = "root";
const PASSWORD = "root";
const HOST = "localhost";
const DIALECT = "mysql";

const sequelize = new Sequelize.Sequelize(
  DATABASE_NAME, USERNAME, PASSWORD,
  {
    dialect: DIALECT, host: HOST, pool: { max: 10, min: 0, acquire: 30000, idle: 10000 }
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
