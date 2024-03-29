import { User, User_Group } from '../models/index.js';
import { Op } from 'sequelize';
const createUser = async (userDTO) => {
    await User.create(userDTO);
};
const getUser = async (userID) => {
    const user = await User.findByPk(userID);
    return user;
};
const getUserOnLogin = async (username, password) => {
    const user = await User.findOne({ where: { login: username, password, isDeleted: false } });
    return user;
};
const getAutoSuggestUsers = async (loginSubstring, limit) => {
    const users = await User.findAll({
        limit,
        where: {
            login: {
                [Op.like]: `%${loginSubstring}%`
            }
        },
        order: ['login']
    });
    return users;
};
const updateUser = async (userID, userDTO) => {
    await User.update(userDTO, {
        where: {
            id: userID
        }
    });
};
const deleteUser = async (userID) => {
    const res = await User.update({ isDeleted: true }, {
        where: {
            id: userID
        }
    });
    const affectedCount = res[0];
    if (affectedCount) {
        await User_Group.destroy({
            where: {
                UserId: userID
            }
        });
    }
    return affectedCount;
};
export { createUser, getUserOnLogin, getAutoSuggestUsers, getUser as getDBuser, updateUser as updateDBuser, deleteUser };
//# sourceMappingURL=userDataAccess.js.map