import { Group as TypeGroup } from '../types/groupType';
declare const createGroup: (groupDTO: TypeGroup) => Promise<void>;
declare const getGroup: (groupID: string) => Promise<import("sequelize/types").Model<any, any>>;
declare const getGroups: () => Promise<import("sequelize/types").Model<any, any>[]>;
declare const updateGroup: (groupID: string, groupDTO: TypeGroup) => Promise<void>;
declare const insertUsersToGroup: (group_id: string, user_ids: string[]) => Promise<void>;
declare const deleteGroup: (groupID: string) => Promise<number>;
export { createGroup, getGroups, getGroup, updateGroup as updateDBGroup, insertUsersToGroup, deleteGroup };
