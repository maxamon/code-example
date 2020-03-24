const { createJWToken } = require('./jwt');

const PromiseRequest = (api, ...args) => {
    return new Promise((resolve) => {
        const data = api.processRequest(...args);
        resolve(data);
    });
};

const asyncRequest = (...args) => {
    return async (req, res, next) => {
        const newReq = req;
        newReq['data'] = await PromiseRequest(...args, req, res);
        next();
    };
};

const makeResponse = (req, res) => {
    const {status, result, error, token} = req.data;
    if (!error) {
        if (token) {
            req.session.token = token;
        }
        res.status(status).json({result, auth: !!req.user});
    } else {
        console.warn('response error -', error);
        res.status(status).json({ error: error.message || error });
    }
};

const setCORSHeaders = (req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://localhost:8080');
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
};

const generateToken = (user, data = {}) => {
    if (data.logout) {
        return null;
    }
    if (user || (data.login && data.type)) {
        const login = (user && user.login) || data.login;
        const type = (user && user.type) || data.type;
        const id = (user && user.id) || data.id;
        return createJWToken({
            sessionData: {login, type, id},
            maxAge: 3600
        });
    }
    return undefined;
};

module.exports = {asyncRequest, makeResponse, generateToken, setCORSHeaders};
