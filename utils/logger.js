const {createLogger, format, transports} = require('winston');
const path = require('path');

// Create logger
const logger = createLogger({
    transports: [
        new transports.Console(),
        new transports.File({ filename: path.join(process.cwd(),'logs/info.log'), level: 'info', maxsize: '3145728', maxFiles: '3'}),
        new transports.File({ filename: path.join(process.cwd(),'logs/error.log'), level: 'error', maxsize: '3145728', maxFiles: '3'})
    ],
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json())
});

module.exports = logger;