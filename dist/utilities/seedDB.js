import { DataTypes } from 'sequelize';
import sequelize from '../config/dbConnect.js';
const users = [
    {
        id: 'user1',
        login: 'alfred',
        password: 'apple',
        age: 16,
        isDeleted: false
    },
    {
        id: 'user2',
        login: 'fred',
        password: 'orange',
        age: 17,
        isDeleted: false
    },
    {
        id: 'user3',
        login: 'freddy',
        password: 'lemon',
        age: 18,
        isDeleted: false
    }
];
createAndPopulateTable();
async function createAndPopulateTable() {
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
    }, {
        timestamps: false
    });
    await User.sync();
    await Promise.all(users.map(async (user) => await User.create({
        id: user.id,
        login: user.login,
        password: user.password,
        age: user.age,
        isDeleted: user.isDeleted
    })));
}
//# sourceMappingURL=seedDB.js.map