'use strict';

const text = 'Morbi accumsan laoreet ipsum. Curabitur consequat, lectus sit amet luctus vulputate, nisi sem semper erat, in consectetuer ipsum nunc id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare tortor at risus. Nunc ac sem ut dolor dapibus gravida. Aliquam tincidunt, nunc';
module.exports = {
    up: async (queryInterface) => {
        const story = await queryInterface.sequelize.query(
            'SELECT id from Stories;'
        );
        const storyRow = story[0];

        const author = await queryInterface.sequelize.query(
            'SELECT id from Authors;'
        );
        const authorRow = author[0];

        const paragraphs = [];
        for (let story of storyRow) {
            for(let i = 0; i < 10; i++) {
                paragraphs.push({
                    text: `StoryID: ${story.id} Text: ${text}`,
                    author_id: authorRow[0].id,
                    story_id: story.id,
                    created_at: new Date(),
                    updated_at: new Date()
                });
            }
        }

        return await queryInterface.bulkInsert('Paragraphs', paragraphs);
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Paragraphs', null, {});
    }
};
