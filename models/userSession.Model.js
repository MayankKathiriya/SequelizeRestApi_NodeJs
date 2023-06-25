module.exports = (connectdb, Sequelize) => {
    const userSessionSchema = connectdb.define('userSession', {

        id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        token: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        user_id: {
            type: Sequelize.BIGINT.UNSIGNED,
            allowNull: false,
            references: {
                model: 'userTbl',
                key: 'id'
            }
        }
    },
        {
            tableName: "userSession"
        });

    return userSessionSchema
}