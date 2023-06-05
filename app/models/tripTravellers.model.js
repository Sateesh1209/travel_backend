module.exports = (sequelize, Sequelize) => {
  const TripTravellers = sequelize.define("tripTravellers", {
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    tripId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    emergencyContact: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    totalTravellers: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return TripTravellers;
};
