const jwt = require('jsonwebtoken');
const { reduce } = require('lodash');
const { logger } = require('../utils/logger');

const salt = '12345';

function verifyJWTToken(token) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, salt, (err, decodedToken) => {
            if (err || !decodedToken) {
                return reject(err);
            }
            resolve(decodedToken);
        });
    });
}

function createJWToken(options) {
    options = typeof options !== 'object' ? {} : options;
    options.maxAge = !options.maxAge || typeof options.maxAge !== 'number' ? 60 : options.maxAge;
    options.sessionData = reduce(options.sessionData || {}, (acc, val, key) => {
        if (typeof val !== 'function' && key !== 'password') {
            acc[key] = val;
        }
        return acc;
    }, {});
    return jwt.sign({
        data: options.sessionData
    }, salt, {
        expiresIn: options.maxAge,
        algorithm: 'HS256'
    });
}

function verifyJWT(req, res, next, errorCallback) {
    const token = req.session.token;
    // logger.debug(JSON.stringify(req.session));

    verifyJWTToken(token)
        .then((decodedToken) => {
            req.user = decodedToken.data;
            next();
        })
        .catch(errorCallback);
}

function verifyJWT_MW(req, res, next) {
    logger.debug(JSON.stringify(req.session));
    verifyJWT(req, res, next, (err) => {
        res.status(401).json({success: false, message: 'Invalid auth token provided.', err}).end();
    });
}

function isAdmin_MW(req, res, next) {
    const { type } = req.user;
    if (type === 'admin') {
        next();
    } else {
        res.status(401).json({success: false, message: 'Not admin'}).end();
    }
}

function decodeJWT_MW(req, res, next) {
    verifyJWT(req, res, next, () => {
        req.user = null;
        next();
    });
}


module.exports = {
    verifyJWTToken,
    createJWToken,
    verifyJWT_MW,
    decodeJWT_MW,
    isAdmin_MW
};
