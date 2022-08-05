const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('file', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    filename: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    pathfile: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    size: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    type: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  })
}