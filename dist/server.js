import express from 'express';
import userRoutes from './routes/users.js';
import groupRoutes from './routes/groups.js';
import sequelize from './config/dbConnect.js';
try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
}
catch (error) {
    console.error('Unable to connect to the database:', error);
}
const app = express();
const port = 3000;
app.use(express.json());
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
app.use('/', userRoutes);
app.use('/', groupRoutes);
app.locals.users = [];
export default app;
//# sourceMappingURL=server.js.map