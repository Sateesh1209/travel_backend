module.exports = (sequelize, Sequelize) => {
  const TripItenary = sequelize.define("tripItenary", {
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
    tripId: {
      type: Sequelize.INTEGER,
      foreignKey: {
        allowNull: false,
        target: "trips",
        field: "id",
        onDelete: "cascade",
      },
    },
  });
  return TripItenary;
};
