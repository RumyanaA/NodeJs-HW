import { createGroup, getGroups, getGroup, updateDBGroup, deleteGroup, insertUsersToGroup } from '../dataAccess/groupDataAccess.js';
import { logInfo } from '../utilities/logging.js';
const addGroup = async (group) => {
    logInfo('addGroup', group);
    await createGroup(group);
};
const getGroupByID = async (groupID) => {
    logInfo('getGroupByID', groupID);
    const foundGroup = await getGroup(groupID);
    return foundGroup;
};
const getAllGroups = async () => {
    logInfo('getAllGroups', 'no arguments');
    const allGroups = await getGroups();
    return allGroups;
};
const updateGroup = async (groupID, groupDTO) => {
    logInfo('updateGroup', groupID, groupDTO);
    await updateDBGroup(groupID, groupDTO);
};
const addUsersToGroup = async (groupID, userIDs) => {
    logInfo('addUsersToGroup', groupID, userIDs);
    await insertUsersToGroup(groupID, userIDs);
};
const removeGroup = async (groupID) => {
    logInfo('removeGroup', groupID);
    const affectedCount = await deleteGroup(groupID);
    if (!affectedCount) {
        return {
            status: 404,
            message: `Group with id ${groupID} not found`
        };
    }
    return {
        status: 204
    };
};
export { addGroup, getGroupByID, getAllGroups, updateGroup, addUsersToGroup, removeGroup };
//# sourceMappingURL=groupServices.js.map