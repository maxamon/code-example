'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Authors', 'user_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Users',
                key: 'id'
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Authors', 'user_id', {});
    }
};

