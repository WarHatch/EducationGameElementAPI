export default (sequelize, type) => {
  return sequelize.define("clickdata", {
      id: {
          type: type.INTEGER,
          primaryKey: true,
          autoIncrement: true
      },
      reactionTime: {
        type: type.INTEGER,
        allowNull: false,
      },
  })
}
