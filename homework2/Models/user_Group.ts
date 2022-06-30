import sequelize from '../config/dbConnect.js';
import { DataTypes } from 'sequelize';
import User from './userModel.js';
import Group from './groupModel.js';

const User_Group = sequelize.define(
    'User_Group',
    {
        UserId: {
            type: DataTypes.INTEGER,
            references: {
                model: User,
                key: 'id'
            }
        },
        GroupId: {
            type: DataTypes.INTEGER,
            references: {
                model: Group,
                key: 'id'
            }
        }
    },
    { timestamps: false }
);

export default User_Group;
