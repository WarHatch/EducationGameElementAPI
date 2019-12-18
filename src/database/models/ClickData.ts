export default (sequelize, type) => {
  return sequelize.define("clickdata", {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    sessionId: {
      type: type.UUID,
    },
    reactionTime: {
      type: type.INTEGER,
      allowNull: false,
    },
    correct: {
      type: type.BOOLEAN,
      allowNull: false,
    },
    question: {
      type: type.STRING,
      allowNull: false,
    }
  })
}
