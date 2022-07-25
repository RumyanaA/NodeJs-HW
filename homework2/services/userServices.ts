import { User } from '../types/userType';
// import app from '../server.js';
import {
    getDBuser,
    getAutoSuggestUsers,
    createUser,
    updateDBuser,
    deleteUser
} from '../dataAccess/userDataAccess.js';

const addUser = async (user: User): Promise<void> => {
    // app.locals.users.push(user);
    await createUser(user);
};

const getUser = async (userID: string) => {
    // const foundUser: User = app.locals.users.find(
    //     (user: User) => user.id === userID
    // );
    // return foundUser;
    const foundUser = await getDBuser(userID);
    return foundUser;
};

// function getAutoSuggestUsers(loginSubstring: string, limit: number): User[] {
//     app.locals.users.sort((a: User, b: User) => a.login.localeCompare(b.login));
//     const filteredUsers = app.locals.users.filter(
//         function (user: User): boolean {
//             if (this.count < limit && user.login.includes(loginSubstring)) {
//                 this.count++;
//                 return true;
//             }
//         },
//         { count: 0 }
//     );
//     return filteredUsers;
// }

const getUsers = async (loginSubstring: string) => {
    const limit = 3;
    const suggestedUsers = await getAutoSuggestUsers(loginSubstring, limit);
    return suggestedUsers;
};

const updateUser = async (userID: string, userDTO: User): Promise<void> => {
    // const foundUserIndex: number = app.locals.users.findIndex(
    //     (user: User) => user.id === userID
    // );
    // if (foundUserIndex === -1) {
    //     app.locals.users.push(userDTO);
    // } else {
    //     app.locals.users[foundUserIndex] = userDTO;
    // }
    await updateDBuser(userID, userDTO);
};

const removeUser = async (userID: string) => {
    const affectedCount = await deleteUser(userID);
    if (!affectedCount) {
        return {
            status: 404,
            message: `User with id ${userID} not found`
        };
    }
    return {
        status: 204
    };
    // const foundUserIndex: number = app.locals.users.findIndex(
    //     (user: User) => user.id === userID
    // );
    // if (foundUserIndex === -1) {
    //     return {
    //         status: 404,
    //         message: `User with id ${userID} not found`
    //     };
    // }
    // app.locals.users[foundUserIndex].isDeleted = true;
    // return {
    //     status: 204
    // };
};

export { addUser, getUser, getUsers, updateUser, removeUser };
