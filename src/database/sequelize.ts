import Sequelize from "sequelize";
import clickDataModel from "./models/ClickData";
import sessionModel from "./models/Session";
import sessionConfigModel from "./models/SessionConfig";
import lessonModel from "./models/Lesson";
import config from "../config"

// tslint:disable: object-literal-sort-keys

const { databaseName, username, password, host, dialect, pool } = config.databaseConfig;

let sequelize: Sequelize.Sequelize | null = null;
if (process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL, {
    dialect:  "postgres",
    protocol: "postgres"
  })
} else {
  // FIXME:
  throw "process.env.DATABASE_URL is missing AND development database not implemented";
}

// const sequelize = new Sequelize.Sequelize(
//   // @ts-ignore FIXME: unsure if username is actually needed
//   databaseName, username, password,
//   // @ts-ignore no way to enfore correct env input
//   {
//     dialect,
//     host,
//     pool,
//   }
// );

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
