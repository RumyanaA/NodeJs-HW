import { User } from '../types/userType';
declare const addUser: (user: User) => Promise<void>;
declare const loginUser: (username: string, password: string) => Promise<any>;
declare const getUser: (userID: string) => Promise<import("../models").User>;
declare const getUsers: (loginSubstring: string) => Promise<import("../models").User[]>;
declare const updateUser: (userID: string, userDTO: User) => Promise<void>;
declare const removeUser: (userID: string) => Promise<{
    status: number;
    message: string;
} | {
    status: number;
    message?: undefined;
}>;
export { addUser, loginUser, getUser, getUsers, updateUser, removeUser };
