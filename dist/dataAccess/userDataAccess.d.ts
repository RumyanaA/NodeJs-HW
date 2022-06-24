import { User as TypeUser } from '../types/userType';
declare const createUser: (userDTO: TypeUser) => Promise<void>;
declare const getUser: (userID: string) => Promise<import("sequelize").Model<any, any>>;
declare const getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<import("sequelize").Model<any, any>[]>;
declare const updateUser: (userID: string, userDTO: TypeUser) => Promise<void>;
declare const deleteUser: (userID: string) => Promise<number>;
export { createUser, getAutoSuggestUsers, getUser as getDBuser, updateUser as updateDBuser, deleteUser };
