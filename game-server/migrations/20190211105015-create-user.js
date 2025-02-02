'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('Users', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            nick_name: {
                type: Sequelize.STRING
            },
            type: {
                type: Sequelize.STRING
            },
            email: {
                type: Sequelize.STRING
            },
            login: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            created_at: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updated_at: {
                allowNull: false,
                type: Sequelize.DATE
            }
        }, {underscored: true});
    },
    down: (queryInterface) => {
        return queryInterface.dropTable('Users');
    }
};
