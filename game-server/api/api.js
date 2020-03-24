const { generateToken } = require('../utils/utils');
const ApiRouter = require('./api-requests');
const { logger } = require('../utils/logger');

class Api {
    constructor() {
        this.state = {
            online_users: []
        };
        const db = initDB();
        this.router = initRouter(db);
    }

    async processRequest(action, req /*, res */) {
        logger.debug(`processRequest - ${action} session ${req.session.token} user ${req.user} - views: ${req.session.views}`);
        try {
            const api = this.router.getApiCall(action);
            const result = await api.call(this.router, req);
            return { status: 200, result, token: generateToken(req.user, result) };
        } catch (error) {
            return { status: error.code || 500, error };
        }
    }
}

const initDB = () => {
    console.log('INITIALISE DB');
    const models = require('../models');
    const db = require('../utils/db');
    let mysql = {isNotInitialized: true};
    try {
        mysql = new db.MyDB(models);
    } catch (error) {
        console.error(error);
    }
    return mysql;
};

const initRouter = (db) => {
    console.log('INITIALISE ROUTER');
    return new ApiRouter(db, this.state);
};

module.exports = Api;