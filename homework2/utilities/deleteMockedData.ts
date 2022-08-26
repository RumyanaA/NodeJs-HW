import { User, Group } from '../models/index';

const hardDeleteUser = async (userID: string): Promise<number> => {
    const res = await User.destroy({
        where: {
            id: userID
        }
    });
    const affectedCount = res;
    return affectedCount;
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

export { hardDeleteUser, deleteGroup };
