import { User as TypeUser } from '../types/userType';
import { User } from '../models/index.js';
declare const createUser: (userDTO: TypeUser) => Promise<void>;
declare const getUser: (userID: string) => Promise<User>;
declare const getAutoSuggestUsers: (loginSubstring: string, limit: number) => Promise<User[]>;
declare const updateUser: (userID: string, userDTO: TypeUser) => Promise<void>;
declare const deleteUser: (userID: string) => Promise<number>;
export { createUser, getAutoSuggestUsers, getUser as getDBuser, updateUser as updateDBuser, deleteUser };
