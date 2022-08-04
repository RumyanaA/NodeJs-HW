const executionTimer = (serviceName) => {
    return (req, res, next) => {
        res.on('finish', () => {
            console.timeEnd(serviceName);
            next();
        });
        console.time(serviceName);
        next();
    };
};
export default executionTimer;
//# sourceMappingURL=executionTimer.js.map