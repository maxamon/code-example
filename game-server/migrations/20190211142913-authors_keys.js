'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Authors', 'story_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Stories',
                key: 'id'
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Authors', 'story_id', {});
    }
};
