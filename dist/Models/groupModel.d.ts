import { GroupI } from '../interfaces/groupInterface.js';
import { Model } from 'sequelize';
import { Permission } from '../types/permissionType.js';
export default class Group extends Model implements GroupI {
    id: string;
    name: string;
    permissions: Permission[];
}
