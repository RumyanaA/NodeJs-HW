import { UserI } from '../interfaces/userInterface';
import { Model } from 'sequelize';
export default class User extends Model implements UserI {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}
