module.exports = (sequelize, Sequelize) => {
  const Travellers = sequelize.define("travellers", {
    travellerNum: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  });
  return Travellers;
};
