var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import sequelize from '../config/dbConnect.js';
import { DataTypes } from 'sequelize';
import { Column } from 'sequelize-typescript';
import { Model } from 'sequelize';
import User from './userModel.js';
import Group from './groupModel.js';
export default class User_Group extends Model {
    UserId;
    GroupId;
}
__decorate([
    Column,
    __metadata("design:type", String)
], User_Group.prototype, "UserId", void 0);
__decorate([
    Column,
    __metadata("design:type", String)
], User_Group.prototype, "GroupId", void 0);
User_Group.init({
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
}, { sequelize, timestamps: false });
//# sourceMappingURL=user_GroupModel.js.map