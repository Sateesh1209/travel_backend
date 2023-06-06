const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.travellers = require("./travellers.model.js")(sequelize, Sequelize);
db.trips = require("./trips.model.js")(sequelize, Sequelize);
db.tripItenary = require("./tripItenary.model.js")(sequelize, Sequelize);
db.tripTravellers = require("./tripTravellers.model.js")(
  sequelize,
  Sequelize
);
db.session = require("./session.model.js")(sequelize, Sequelize);
db.user = require("./user.model.js")(sequelize, Sequelize);
db.events = require("./events.model.js")(sequelize, Sequelize);

// foreign key for session
db.user.hasMany(
  db.session,
  {onDelete: 'CASCADE'}
);
db.session.belongsTo(
  db.user,
  { onDelete: "CASCADE" }
);

// foreign key for trips
db.user.hasMany(
  db.trips,
  { onDelete: "CASCADE" }
);
db.trips.belongsTo(
  db.user,
  { foreignKey: { allowNull: true }, onDelete: "CASCADE" }
);

// foreign key for tripItenary
db.trips.hasMany(
  db.tripItenary,
  {as: 'tripItenary'},
  {  onDelete: "CASCADE" }
);
db.tripItenary.belongsTo(
  db.trips,
  {  onDelete: "CASCADE" }
);

db.tripItenary.hasMany(
  db.events,
  {  onDelete: "CASCADE" }
);
db.events.belongsTo(
  db.tripItenary,
  {  onDelete: "CASCADE" }
);

db.trips.hasMany(
  db.tripTravellers,
  { onDelete: "CASCADE" }
);

db.tripTravellers.belongsTo(
  db.trips,
  {  onDelete: "CASCADE" }
);

db.tripTravellers.hasMany(
  db.travellers,
  {  onDelete: "CASCADE" }
);

db.travellers.belongsTo(
  db.tripTravellers,
  {  onDelete: "CASCADE" }
);

module.exports = db;
