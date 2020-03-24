const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const express = require('express');
const cookieSession = require('cookie-session');
const router = require('./api/route');

const {logger} = require('./utils/logger');
const {setCORSHeaders} = require('./utils/utils');

const app = express();
const port = process.env.PORT || 3123;

if(process.env.NODE_ENV === 'development') {
    app.use(cors({origin: 'http://localhost:8080', credentials: true}));
    app.use(setCORSHeaders);
} else {
    app.use(express.static('../game-front/dist'));
}

app.use(bodyParser.json());

app.set('trust proxy', 1);
app.use(cookieSession({
    name: 'session',
    keys: ['valia', 'iana']
}));

app.use('/api', router);

if(process.env.NODE_ENV === 'development') {
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../game-front/dist/index.html'));
    });
}

app.listen(port, function() {
    const env = process.env.NODE_ENV === 'development' ? 'Development' : 'Production';
    logger.info(`Story game server in '${env}' mode listening on port ${port}`);
});
