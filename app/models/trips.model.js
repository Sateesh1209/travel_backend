
module.exports = (sequelize, Sequelize) => {
  const Trips = sequelize.define("trips", {
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
    }
  });
  return Trips;
};
