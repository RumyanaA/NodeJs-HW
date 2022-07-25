import { Group } from '../types/groupType';
import {
    createGroup,
    getGroups,
    getGroup,
    updateDBGroup,
    deleteGroup,
    insertUsersToGroup
} from '../dataAccess/groupDataAccess.js';
import { logInfo } from '../utilities/logging.js';

const addGroup = async (group: Group): Promise<void> => {
    logInfo('addGroup', group);
    await createGroup(group);
};

const getGroupByID = async (groupID: string) => {
    logInfo('getGroupByID', groupID);
    const foundGroup = await getGroup(groupID);
    return foundGroup;
};

const getAllGroups = async () => {
    logInfo('getAllGroups', 'no arguments');
    const allGroups = await getGroups();
    return allGroups;
};

const updateGroup = async (groupID: string, groupDTO: Group): Promise<void> => {
    logInfo('updateGroup', groupID, groupDTO);
    await updateDBGroup(groupID, groupDTO);
};

const addUsersToGroup = async (groupID:string, userIDs:string[]):Promise<void> => {
    logInfo('addUsersToGroup', groupID, userIDs);
    await insertUsersToGroup(groupID, userIDs);
};

const removeGroup = async (groupID: string) => {
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

export {
    addGroup,
    getGroupByID,
    getAllGroups,
    updateGroup,
    addUsersToGroup,
    removeGroup
};
