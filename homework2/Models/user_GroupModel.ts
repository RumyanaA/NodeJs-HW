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
