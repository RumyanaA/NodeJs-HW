import { Group as TypeGroup } from '../types/groupType';
import Group from '../models/groupModel.js';
import sequelize from '../config/dbConnect.js';
import { User_Group } from '../models/index.js';
import { getUser } from 'homework2/services/userServices';
import { User } from 'homework2/types/userType';

const createGroup = async (groupDTO: TypeGroup): Promise<void> => {
    await Group.create(groupDTO);
};

const getGroup = async (groupID: string) => {
    const group = await Group.findByPk(groupID);
    return group;
};

const getGroups = async () => {
    const groups = await Group.findAll();
    return groups;
};

const updateGroup = async (
    groupID: string,
    groupDTO: TypeGroup
): Promise<void> => {
    await Group.update(groupDTO, {
        where: {
            id: groupID
        }
    });
};

const insertUsersToGroup = async (group_id: string, user_ids: string[]) => {
    try {
        await sequelize.transaction(async (t) => {
            await Promise.all(
                user_ids.map(async (userId) => {
                    // const user = await getUser(userId);
                    // if(user.isDeleted)
                    await User_Group.create(
                        { GroupId: group_id, UserId: userId },
                        { transaction: t }
                    );
                })
            );
        });
    } catch (e) {
        console.log(e);
    }
};

const deleteGroup = async (groupID: string): Promise<number> => {
    const res = await Group.destroy({
        where: {
            id: groupID
        }
    });
    const affectedCount = res;
    return affectedCount;
};
export {
    createGroup,
    getGroups,
    getGroup,
    updateGroup as updateDBGroup,
    insertUsersToGroup,
    deleteGroup
};
