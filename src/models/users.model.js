const { DataTypes } = require('sequelize')

module.exports = function (sequelize) {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    usedSpace: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    diskSpace: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    surname: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    role: {
      default: "user",
      allowNull: false,
      type: DataTypes.STRING,
    },
  })
}