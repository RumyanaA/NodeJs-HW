import express from 'express';
import userRoutes from './routes/users.js';
import groupRoutes from './routes/groups.js';
import sequelize from './config/dbConnect.js';
import cors from 'cors';
import debug from 'debug';
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
const app = express();
app.use(cors());
const port = 3000;
app.use(express.json());
const debugApp = debug('server');
debugApp('booting app');
app.listen(port, () => {
    debugApp(`Example app listening on port ${port}`);
});
app.use('/', userRoutes);
app.use('/', groupRoutes);
process.on('uncaughtException', (e) => {
    console.error('process error is:', e.message);
    process.exit(1);
});
process.on('unhandledRejection', (reason, p) => {
    console.error(reason, 'Unhandled Rejection at Promise', p);
    process.exit(1);
});
app.locals.users = [];
export default app;
//# sourceMappingURL=server.js.map