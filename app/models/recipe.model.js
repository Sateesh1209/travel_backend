module.exports = (sequelize, Sequelize) => {
  const Recipe = sequelize.define("recipe", {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    countryName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    capacity: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    fromDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    toDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    isPublished: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
  });
  return Recipe;
};
