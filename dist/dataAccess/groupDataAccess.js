import sequelize from '../config/dbConnect.js';
import { User_Group, Group } from '../models/index.js';
import { getUser } from '../services/userServices.js';
const createGroup = async (groupDTO) => {
    await Group.create(groupDTO);
};
const getGroup = async (groupID) => {
    const group = await Group.findByPk(groupID);
    return group;
};
const getGroups = async () => {
    const groups = await Group.findAll();
    return groups;
};
const updateGroup = async (groupID, groupDTO) => {
    await Group.update(groupDTO, {
        where: {
            id: groupID
        }
    });
};
const insertUsersToGroup = async (group_id, user_ids) => {
    try {
        await sequelize.transaction(async (t) => {
            await Promise.all(user_ids.map(async (userId) => {
                const user = await getUser(userId);
                if (!user.isDeleted) {
                    await User_Group.create({ GroupId: group_id, UserId: userId }, { transaction: t });
                }
            }));
        });
    }
    catch (e) {
        console.log(e);
    }
};
const deleteGroup = async (groupID) => {
    const res = await Group.destroy({
        where: {
            id: groupID
        }
    });
    const affectedCount = res;
    return affectedCount;
};
export { createGroup, getGroups, getGroup, updateGroup as updateDBGroup, insertUsersToGroup, deleteGroup };
//# sourceMappingURL=groupDataAccess.js.map