import sequelize from '../config/dbConnect.js';
import { UserI } from '../interfaces/userInterface';
import { AllowNull, Column, PrimaryKey } from 'sequelize-typescript';
import { Model } from 'sequelize';
import { DataTypes } from 'sequelize';

export default class User extends Model implements UserI {
  @PrimaryKey
  @Column
      id: string;
  @AllowNull(false)
  @Column
      login: string;

  @Column
      password: string;

  @Column
      age: number;

  @Column
      isDeleted: boolean;
}

User.init(
    {
        id: {
            type: DataTypes.STRING,
            allowNull: false,
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
    },
    { sequelize, timestamps: false }
);
