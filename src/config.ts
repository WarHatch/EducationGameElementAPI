interface IFullConfig {
  port: number;
  host: string;
  databaseConfig: {
    databaseName: string;
    username: string;
    password: string;
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
  port: 8090,
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
  port: 8090,
  host: "http://localhost:8090",

  databaseConfig: {
    databaseName: "game-data-registry",
    dialect: "mysql",
    pool: { max: 10, min: 0, acquire: 30000, idle: 10000 },
  }
}

const configByEnv = (): IFullConfig => {
  if (process.env.NODE_ENV === "production") {
    const { db_user, db_pass, db_host } = process.env
    if (db_user === undefined)
      throw new Error("db_user missing from env");
    if (db_pass === undefined)
      throw new Error("db_pass missing from env");
    if (db_host === undefined)
      throw new Error("db_host missing from env");

    return {
      ...productionConfig,
      databaseConfig: {
        ...productionConfig.databaseConfig,
        username: db_user,
        password: db_pass,
        host: db_host,
      }
    }
  }
  else return devConfig;
};

export default configByEnv();