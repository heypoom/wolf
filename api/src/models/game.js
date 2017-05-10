import Sequelize from "sequelize"
import sequelize from "./index"

export const Player = sequelize.define("player", {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

export const Game = sequelize.define("game", {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false
  }
})

Game.hasMany(Player, {as: "players"})
Player.belongsTo(Game, {onDelete: "cascade"})

Game.beforeValidate(game => {
  game.id = Math.random().toString(36).substring(2, 8)
})
