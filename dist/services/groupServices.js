import { createGroup, getGroups, getGroup, updateDBGroup, deleteGroup, insertUsersToGroup } from '../dataAccess/groupDataAccess.js';
const addGroup = async (group) => {
    await createGroup(group);
};
const getGroupByID = async (groupID) => {
    const foundGroup = await getGroup(groupID);
    return foundGroup;
};
const getAllGroups = async () => {
    const allGroups = await getGroups();
    return allGroups;
};
const updateGroup = async (groupID, groupDTO) => {
    await updateDBGroup(groupID, groupDTO);
};
const addUsersToGroup = async (group_id, user_ids) => {
    await insertUsersToGroup(group_id, user_ids);
};
const removeGroup = async (groupID) => {
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