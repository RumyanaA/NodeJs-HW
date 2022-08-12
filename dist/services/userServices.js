import { getDBuser, getUserOnLogin, getAutoSuggestUsers, createUser, updateDBuser, deleteUser } from '../dataAccess/userDataAccess.js';
import jwt from 'jsonwebtoken';
import config from '../config/index.js';
const addUser = async (user) => {
    await createUser(user);
};
const loginUser = async (username, password) => {
    const foundUser = await getUserOnLogin(username, password);
    if (!foundUser) {
        return 'username or password is incorrect';
    }
    const token = jwt.sign({ username, password }, config.jwtSecret);
    return token;
};
const getUser = async (userID) => {
    const foundUser = await getDBuser(userID);
    return foundUser;
};
const getUsers = async (loginSubstring) => {
    const limit = 3;
    const suggestedUsers = await getAutoSuggestUsers(loginSubstring, limit);
    return suggestedUsers;
};
const updateUser = async (userID, userDTO) => {
    await updateDBuser(userID, userDTO);
};
const removeUser = async (userID) => {
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
};
export { addUser, loginUser, getUser, getUsers, updateUser, removeUser };
//# sourceMappingURL=userServices.js.map