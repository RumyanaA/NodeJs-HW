import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';
const User = sequelize.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    login: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    isDeleted: {
        type: DataTypes.BOOLEAN
    }
});
await User.sync();
export default User;
//# sourceMappingURL=userModel.js.map