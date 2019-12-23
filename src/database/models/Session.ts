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

export default (sequelize, type, ClickData) => {
  const SessionModel = Session(sequelize, type);
  SessionModel.hasMany(ClickData, { foreignKey: "sessionId" })
  return SessionModel
}
