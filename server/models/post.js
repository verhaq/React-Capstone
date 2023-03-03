const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");
const { user } = require('./user.js')

module.exports = {
  Post: sequelize.define("post", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    notes: DataTypes.STRING,
    notes2: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: user,
        key: 'id'
      }
    }
  }),
};