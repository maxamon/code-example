'use strict';

module.exports = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('Users', [{
            nick_name: 'John Doe',
            type: 'admin',
            email: '',
            login: 'john',
            password: '12345',
            created_at: new Date(),
            updated_at: new Date()
        }], {});
    },

    down: (queryInterface) => {
        return queryInterface.bulkDelete('Users', null, {});
    }
};
