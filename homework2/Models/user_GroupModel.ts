import sequelize from '../config/dbConnect.js';
import { DataTypes } from 'sequelize';
import { Column } from 'sequelize-typescript';
import { Model } from 'sequelize';
import User from './userModel.js';
import Group from './groupModel.js';

export default class User_Group extends Model {
  @Column
      UserId: string;
  @Column
      GroupId: string;
}

User_Group.init(
    {
        UserId: {
            type: DataTypes.STRING,
            references: {
                model: User,
                key: 'id'
            }
        },
        GroupId: {
            type: DataTypes.STRING,
            references: {
                model: Group,
                key: 'id'
            }
        }
    },
    { sequelize, timestamps: false }
);

// import User from './userModel.js';
// import Group from './groupModel.js';

// const User_Group = sequelize.define(
//     'User_Group',
//     {
//         UserId: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: User,
//                 key: 'id'
//             }
//         },
//         GroupId: {
//             type: DataTypes.INTEGER,
//             references: {
//                 model: Group,
//                 key: 'id'
//             }
//         }
//     },
//     { timestamps: false }
// );

// export default User_Group;
