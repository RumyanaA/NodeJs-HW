import User from './userModel.js';
import Group from './groupModel.js';
import User_Group from './User_Group.js';
import sequelize from '../config/dbConnect.js';

User.belongsToMany(Group, { through: User_Group });
Group.belongsToMany(User, { through: User_Group });

await sequelize.sync({ alter: true });
export { User, Group, User_Group };
