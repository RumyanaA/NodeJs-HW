import { Group } from '../types/groupType';
import {
    createGroup,
    getGroups,
    getGroup,
    updateDBGroup,
    deleteGroup,
    insertUsersToGroup
} from '../dataAccess/groupDataAccess.js';

const addGroup = async (group: Group): Promise<void> => {
    await createGroup(group);
};

const getGroupByID = async (groupID: string) => {
    const foundGroup = await getGroup(groupID);
    return foundGroup;
};

const getAllGroups = async () => {
    const allGroups = await getGroups();
    return allGroups;
};

const updateGroup = async (groupID: string, groupDTO: Group): Promise<void> => {
    await updateDBGroup(groupID, groupDTO);
};

const addUsersToGroup = async (group_id:string, user_ids:string[]):Promise<void> => {
    await insertUsersToGroup(group_id, user_ids);
};

const removeGroup = async (groupID: string) => {
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
