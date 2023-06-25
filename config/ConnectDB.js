require("dotenv").config();
const { Sequelize } = require("sequelize");

const connectdb = new Sequelize(process.env.DATABASE, process.env.USER, '', {
    host: process.env.HOST,
    dialect: 'mysql'
});

// for CheckConnection with Database

// const CheckConnection = async () => {
//     try {
//         await connectdb.authenticate();
//         console.log('Connection has been established successfully.');
//       } catch (error) {
//         console.error('Unable to connect to the database:', error);
//       }
// }
// CheckConnection();

const db = {}

db.connectdb = connectdb
db.Sequelize = Sequelize

// User Table
db.user = require("../models/User.Model")(connectdb, Sequelize);

// user Session Table
db.user_Session = require("../models/userSession.Model")(connectdb, Sequelize);

// user Relation  with Table And UserSession
db.user.hasMany(db.user_Session, { foreignKey: "user_id" })
db.user_Session.belongsTo(db.user, { foreignKey: "user_id" });

// db.connectdb.sync({ force: false });

module.exports = db;
