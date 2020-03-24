/**
 * Router
 *
 * by Maksym Herasymenko
 */

const express = require('express');
const router = express.Router();

const { asyncRequest, makeResponse } = require('../utils/utils');
const { verifyJWT_MW, decodeJWT_MW /*isAdmin_MW*/ } = require('../utils/jwt');

const Api = require('./api');
const api = new Api();

// Authorization
router.post('/login',    asyncRequest(api, 'login'),    makeResponse);
router.post('/signin',   asyncRequest(api, 'signin'),   makeResponse);
router.get( '/logout',   asyncRequest(api, 'logout'),   makeResponse);
router.get( '/auth',     verifyJWT_MW, asyncRequest(api, 'auth'),   makeResponse);

// Common requests
router.get( '/init',          verifyJWT_MW, asyncRequest(api, 'get_init_data'),  makeResponse);

// Common stories commands
router.get('/stories/main',       decodeJWT_MW, asyncRequest(api, 'main_lists'),     makeResponse);

router.get('/stories',            decodeJWT_MW, asyncRequest(api, 'stories_list'),     makeResponse);
router.post('/stories',           verifyJWT_MW, asyncRequest(api, 'create_story'),     makeResponse);
router.delete( '/stories/:id',    verifyJWT_MW, asyncRequest(api, 'delete_story'),       makeResponse);
router.put( '/stories/:id',       verifyJWT_MW, asyncRequest(api, 'update_story'),       makeResponse);

router.get('/paragraphs/:storyID/freeze', verifyJWT_MW, asyncRequest(api, 'freeze_paragraphs'),     makeResponse);
router.get('/paragraphs/:storyID/:page', decodeJWT_MW, asyncRequest(api, 'get_paragraphs'),     makeResponse);
router.post('/paragraphs',        verifyJWT_MW, asyncRequest(api, 'save_story_part'),     makeResponse);

// Admin requests
router.get( '/users',      verifyJWT_MW, asyncRequest(api, 'get_users'),  makeResponse);
router.post('/users',      verifyJWT_MW, asyncRequest(api, 'save_user'),  makeResponse);
router.get( '/users/:id',  verifyJWT_MW, asyncRequest(api, 'get_user'),   makeResponse);

module.exports = router;
