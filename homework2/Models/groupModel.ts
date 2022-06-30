import sequelize from '../config/dbConnect.js';
import { GroupI } from '../interfaces/groupInterface.js';
import { AllowNull, Column, PrimaryKey } from 'sequelize-typescript';
import { Model } from 'sequelize';
import { DataTypes } from 'sequelize';
import { Permission } from '../types/permissionType.js';

export default class Group extends Model implements GroupI {
  @PrimaryKey
  @Column
      id: string;
  @AllowNull(false)
  @Column
      name: string;

  permissions: Permission[];
}

Group.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING
        },
        permissions: {
            type: DataTypes.ARRAY(DataTypes.STRING)
        }
    },
    { sequelize, timestamps: false }
);

