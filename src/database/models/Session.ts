const Session = (sequelize, type) => {
  return sequelize.define("session", {
    sessionId: {
      type: type.UUID,
      primaryKey: true,
    },
    finishedAt: {
      type: type.DATE,
      allowNull: true,
    }
  })
}

export default (sequelize, type, hasMany: { [key: string]: any }) => {
  const SessionModel = Session(sequelize, type);
  SessionModel.hasMany(hasMany.ClickData, { foreignKey: "sessionId" })
  SessionModel.hasMany(hasMany.SessionConfig, { foreignKey: "sessionId" })
  return SessionModel
}
