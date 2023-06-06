module.exports = (sequelize, Sequelize) => {
    const Events = sequelize.define("events", {
      event: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      tripItenaryId: {
        type: Sequelize.INTEGER,
        foreignKey: {
          allowNull: false,
          target: "tripItenary",
          field: "id",
          onDelete: "cascade",
        },
      },
    });
    return Events;
  };
  