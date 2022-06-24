import express from 'express';
import routes from './routes/userRoutes.js';
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
app.use('/', routes);
app.locals.users = [];
export default app;
//# sourceMappingURL=server.js.map