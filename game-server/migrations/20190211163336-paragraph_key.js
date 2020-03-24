'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Paragraphs', 'author_id', {
            type: Sequelize.INTEGER,
            references: {
                model: 'Authors',
                key: 'id'
            }
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Paragraphs', 'author_id', {});
    }
};
