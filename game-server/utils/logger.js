const path = require('path');
const winston = require('winston');
const { inspect } = require('util');

function formatParams(info) {
    const { timestamp, level, message, ...args } = info;
    const ts = timestamp.slice(0, 19).replace('T', ' ');

    return `${ts} [${process.pid}] ${level}: ${message} ${Object.keys(args).length
        ? JSON.stringify(inspect(args))
        : ''}`;
}

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.File({
            level:            'info',
            format: winston.format.combine(
                winston.format.uncolorize(),
                winston.format.timestamp(),
                winston.format.align(),
                winston.format.printf(formatParams),
            ),
            filename:         path.resolve(__dirname, '../logs/server.log'),
            handleExceptions: true,
            maxsize:          5242880, // 5MB
            maxFiles:         5,
        }),
    ],
    exitOnError: false,
});

if (process.env.NODE_ENV === 'develop') {
    logger.add(new winston.transports.Console({
        level:            'debug',
        format: winston.format.combine(
            winston.format.colorize(),
            winston.format.timestamp(),
            winston.format.align(),
            winston.format.printf(formatParams),
        ),
        handleExceptions: true,
    }));
}

const morganOption = {
    stream: {
        write: (message) => {
            logger.info(message.trim());
        },
    },
};

module.exports = {
    morganOption,
    logger
};
