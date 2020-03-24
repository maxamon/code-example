'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Paragraphs', 'story_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Stories',
                key: 'id'
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Paragraphs', 'story_id', {});
    }
};
