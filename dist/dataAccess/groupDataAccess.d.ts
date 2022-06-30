import { Group as TypeGroup } from '../types/groupType';
import { Group } from '../models/index.js';
declare const createGroup: (groupDTO: TypeGroup) => Promise<void>;
declare const getGroup: (groupID: string) => Promise<Group>;
declare const getGroups: () => Promise<Group[]>;
declare const updateGroup: (groupID: string, groupDTO: TypeGroup) => Promise<void>;
declare const insertUsersToGroup: (group_id: string, user_ids: string[]) => Promise<void>;
declare const deleteGroup: (groupID: string) => Promise<number>;
export { createGroup, getGroups, getGroup, updateGroup as updateDBGroup, insertUsersToGroup, deleteGroup };
