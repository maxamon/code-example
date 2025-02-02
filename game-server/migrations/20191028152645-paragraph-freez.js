'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('Paragraphs', 'freeze', {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        });
    },

    down: (queryInterface) => {
        return queryInterface.removeColumn('Paragraphs', 'freeze', {});
    }
};
