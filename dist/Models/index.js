import sequelize from '../config/dbConnect.js';
import User from './userModel.js';
import Group from './groupModel.js';
import User_Group from './user_GroupModel.js';
User.belongsToMany(Group, { through: User_Group });
Group.belongsToMany(User, { through: User_Group });
await sequelize.sync({ alter: true });
export { User, Group, User_Group };
//# sourceMappingURL=index.js.map