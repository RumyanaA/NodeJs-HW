import { Group } from '../types/groupType';
declare const addGroup: (group: Group) => Promise<void>;
declare const getGroupByID: (groupID: string) => Promise<import("../models").Group>;
declare const getAllGroups: () => Promise<import("../models").Group[]>;
declare const updateGroup: (groupID: string, groupDTO: Group) => Promise<void>;
declare const addUsersToGroup: (groupID: string, userIDs: string[]) => Promise<void>;
declare const removeGroup: (groupID: string) => Promise<{
    status: number;
    message: string;
} | {
    status: number;
    message?: undefined;
}>;
export { addGroup, getGroupByID, getAllGroups, updateGroup, addUsersToGroup, removeGroup };
