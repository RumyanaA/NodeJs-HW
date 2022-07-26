import debug from 'debug';
const expressLogger = (serviceName) => {
    return (req, res, next) => {
        const debugService = debug('App:Service');
        const current_datetime = new Date();
        const formatted_date = `${current_datetime.getFullYear()}-${current_datetime.getMonth() + 1}-${current_datetime.getDate()} ${current_datetime.getHours()}:${current_datetime.getMinutes()}:${current_datetime.getSeconds()}`;
        let serviceArguments = `Arguments:${JSON.stringify(Object.keys(req.body).length !== 0 ? req.body : [])}${JSON.stringify(Object.values(req.params))}${JSON.stringify(Object.values(req.query))}`;
        serviceArguments = serviceArguments.replace(/\[|\]/g, '');
        const log = `[${formatted_date}] Service: ${serviceName}, ${serviceArguments}`;
        debugService(log);
        next();
    };
};
export default expressLogger;
//# sourceMappingURL=expressLogger.js.map