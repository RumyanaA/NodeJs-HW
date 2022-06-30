import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';
const User = sequelize.define('Users', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false
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
}, {
    timestamps: false
});
export default User;
//# sourceMappingURL=userModel.js.map