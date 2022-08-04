import { createLogger, format, transports } from 'winston';
import { loggerPath } from '../config/loggerPath.js';
export default createLogger({
    format: format.combine(format.timestamp({
        format: 'YYYY-MM-DD HH:mm:ss'
    }), format.errors({ stack: true }), format.splat(), format.printf((info) => `${info.level}: ${[info.timestamp]}: ${info.message}`)),
    transports: [
        new transports.File({ filename: loggerPath, level: 'error' })
    ]
});
//# sourceMappingURL=winstonLogger.js.map