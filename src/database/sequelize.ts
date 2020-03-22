import Sequelize from "sequelize";
import asteroidClickDataModel from "./models/AsteroidClickData";
import sessionModel from "./models/Session";
import sessionConfigModel from "./models/SessionConfig";
import lessonModel from "./models/Lesson";
import config from "../config"

// tslint:disable: object-literal-sort-keys

const { databaseName, username, password, host, dialect, pool } = config.databaseConfig;

let sequelize: Sequelize.Sequelize;
if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
  // the application is executed on Heroku ... use the postgres database
  sequelize = new Sequelize.Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    protocol: "postgres"
  })
} else {
  // @ts-ignore
  sequelize = new Sequelize.Sequelize(databaseName, username, password,
    {
      dialect,
      host,
      pool,
    }
  )
}

const AsteroidClickData = asteroidClickDataModel(sequelize, Sequelize)
const SessionConfig = sessionConfigModel(sequelize, Sequelize)
const Session = sessionModel(sequelize, Sequelize,
  {
    AsteroidClickData,
    SessionConfig,
  }
)
const Lesson = lessonModel(sequelize, Sequelize,
  {
    Session,
  }
)

sequelize.sync({ force: true })
  .then(() => {
    console.log("Database & tables created!")
  })

export default {
  AsteroidClickData,
  SessionConfig,
  Session,
  Lesson,
}
