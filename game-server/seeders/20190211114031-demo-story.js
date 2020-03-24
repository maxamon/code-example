'use strict';

const stories = [
    {
        title: 'Beginning',
        compiled_text: 'Very small story.\n That\'s all!',
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        title: 'Beginning 2',
        compiled_text: 'Very small story.\n That\'s all!',
        created_at: new Date(),
        updated_at: new Date()
    },
    {
        title: 'Beginning 4',
        compiled_text: 'Very small story.\n That\'s all!',
        created_at: new Date(),
        updated_at: new Date()
    },
];

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Stories', stories, {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Stories', null, {});
    }
};
