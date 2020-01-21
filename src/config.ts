interface IFullConfig {
  port: string;
  host: string;
  databaseConfig: {
    databaseName: string;
    username?: string;
    password?: string;
    host: string;
    dialect: string;
    pool: {
      max: number;
      min: number;
      acquire: number;
      idle: number;
    };
  };
}

const devConfig = {
  port: "8090",
  host: "http://localhost:8090",

  databaseConfig: {
    databaseName: "game-data-registry",
    username: "root",
    password: "root",
    host: "localhost",
    dialect: "mysql",
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  }
}

const productionConfig = {
  port: "80",
  host: "https://education-game-tool-2020.herokuapp.com",
  databaseConfig: {
    databaseName: "game-data-registry",
    dialect: "postgres",
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  }
}

const configByEnv = (): IFullConfig => {
  if (process.env.NODE_ENV === "production") {
    const { db_user, db_pass, DATABASE_URL, PORT } = process.env
    if (PORT === undefined)
      console.log("[WARNING]: PORT is undefined. Falling back to port " + productionConfig.port)
    // if (db_user === undefined)
    //   throw new Error("db_user missing from env");
    // if (db_pass === undefined)
    //   throw new Error("db_pass missing from env");
    if (DATABASE_URL === undefined)
      throw new Error("DATABASE_URL missing from env");

    return {
      ...productionConfig,
      port: PORT ?? productionConfig.port,
      databaseConfig: {
        ...productionConfig.databaseConfig,
        // username: db_user,
        // password: db_pass,
        host: DATABASE_URL,
      }
    }
  }
  else return devConfig;
};

export default configByEnv();