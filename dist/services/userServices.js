import { logInfo } from '../utilities/logging.js';
import { getDBuser, getAutoSuggestUsers, createUser, updateDBuser, deleteUser } from '../dataAccess/userDataAccess.js';
const addUser = async (user) => {
    logInfo('addUser', user);
    await createUser(user);
};
const getUser = async (userID) => {
    logInfo('getUser', userID);
    const foundUser = await getDBuser(userID);
    return foundUser;
};
const getUsers = async (loginSubstring) => {
    const limit = 3;
    logInfo('getUsers', loginSubstring);
    const suggestedUsers = await getAutoSuggestUsers(loginSubstring, limit);
    return suggestedUsers;
};
const updateUser = async (userID, userDTO) => {
    logInfo('updateUser', userID, userDTO);
    await updateDBuser(userID, userDTO);
};
const removeUser = async (userID) => {
    logInfo('removeUser', userID);
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
export { addUser, getUser, getUsers, updateUser, removeUser };
//# sourceMappingURL=userServices.js.map