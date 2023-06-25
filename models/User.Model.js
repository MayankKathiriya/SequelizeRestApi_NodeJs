const bcrypt = require("bcrypt");

module.exports = (connectdb, Sequelize) => {
    const userSchema = connectdb.define('userTbl',{
        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false,
            set(val) {
                this.setDataValue("password", bcrypt.hashSync(val, 12));
            }
        }
    },
        {
            tableName : "userTbl"
        });

       return userSchema
}