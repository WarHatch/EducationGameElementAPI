import Sequelize from "sequelize";
import asteroidClickDataModel from "./models/AsteroidClickData";
import sentenceConstructorClickDataModel from "./models/SentenceConstructorClickData";
import sessionModel from "./models/Session";
import asteroidSessionConfigModel from "./models/AsteroidSessionConfig";
import sentenceConstructorConfigModel from "./models/SentenceConstructorConfig";
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
const AsteroidSessionConfig = asteroidSessionConfigModel(sequelize, Sequelize)
const SentenceConstructorClickData = sentenceConstructorClickDataModel(sequelize, Sequelize)
const SentenceConstructorConfig = sentenceConstructorConfigModel(sequelize, Sequelize)
const Session = sessionModel(sequelize, Sequelize,
  {
    AsteroidClickData,
    AsteroidSessionConfig,
    SentenceConstructorClickData,
    SentenceConstructorConfig
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
  AsteroidClickData,
  AsteroidSessionConfig,
  SentenceConstructorClickData,
  SentenceConstructorConfig,
  Session,
  Lesson,
}
