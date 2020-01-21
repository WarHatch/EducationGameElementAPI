const devConfig = {
  port: 8090,
  host: "http://localhost:8090",

  databaseConfig: {
    databaseName: "game-data-registry",
    username: "root",
    password: "root",
    host: "localhost",
    dialect: "mysql",
    pool: { max: 4, min: 0, acquire: 30000, idle: 10000 },
  }
}

const productionConfig = {
  port: 8090,
  host: "http://localhost:8090",
}

const configByEnv = () => {
  if (process.env.NODE_ENV === "production")
    return productionConfig;
  else return devConfig;
};

export default configByEnv();