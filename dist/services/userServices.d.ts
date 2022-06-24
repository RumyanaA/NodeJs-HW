import { User } from '../types/userType';
declare const addUser: (user: User) => Promise<void>;
declare const getUser: (userID: string) => Promise<import("sequelize/types").Model<any, any>>;
declare const getUsers: (loginSubstring: string) => Promise<import("sequelize/types").Model<any, any>[]>;
declare const updateUser: (userID: string, userDTO: User) => Promise<void>;
declare const removeUser: (userID: string) => Promise<{
    status: number;
    message: string;
} | {
    status: number;
    message?: undefined;
}>;
export { addUser, getUser, getUsers, updateUser, removeUser };
