const db = require("../models");
const Recipe = db.recipe;
module.exports = (sequelize, Sequelize) => {
  const RecipeStep = sequelize.define("recipeStep", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    day: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    location: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    hotelName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    meals: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    visitPlaces: {
      type: Sequelize.STRING(5000),
      allowNull: false,
    },
    dayEvents: {
      type: Sequelize.STRING(5000),
      allowNull: false,
    },
    recipeId: {
      type: Sequelize.INTEGER,
      references: { model: Recipe, key: 'id' },
      onDelete: 'cascade',
    },
  });
  return RecipeStep;
};
