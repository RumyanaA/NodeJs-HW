const executionTimer = (serviceName:string) => {
    return (req, res, next) => {
        res.on('finish', () => {
            // timer end
            console.timeEnd(serviceName);
            next();
        });
        // timer start
        console.time(serviceName);
        next();
    };
};

export default executionTimer;
