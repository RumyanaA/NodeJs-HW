import { Sequelize } from 'sequelize';
import config from './index.js';
const sequelize = new Sequelize('postgres', config.username, config.password, {
    host: 'localhost',
    dialect: 'postgres'
});
export default sequelize;
//# sourceMappingURL=dbConnect.js.map