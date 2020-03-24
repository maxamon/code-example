'use strict';

module.exports = {
    up: async (queryInterface) => {
        const story = await queryInterface.sequelize.query(
            'SELECT id from Stories;'
        );
        const storyRow = story[0];

        const user = await queryInterface.sequelize.query(
            'SELECT id from Users;'
        );
        const userRow = user[0];

        return await queryInterface.bulkInsert('Authors', [{
            user_id: userRow[0].id,
            story_id: storyRow[0].id,
            created_at: new Date(),
            updated_at: new Date()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Authors', null, {});
    }
};
