'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Stories', 'current_user_id', {
            type: Sequelize.INTEGER,
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Stories', 'current_user_id', {});
    }
};
