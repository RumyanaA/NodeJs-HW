import { User as TypeUser } from '../types/userType';
import { User, User_Group } from '../models/index.js';
import { Op } from 'sequelize';

const createUser = async (userDTO: TypeUser): Promise<void> => {
    await User.create(userDTO);
};

const getUser = async (userID: string) => {
    const user = await User.findByPk(userID);
    return user;
};

const getUserOnLogin = async (username: string, password: string) => {
    const user = await User.findOne({ where: { login: username, password, isDeleted: false } });
    return user;
};

const getAutoSuggestUsers = async (loginSubstring: string, limit: number) => {
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
const updateUser = async (userID: string, userDTO: TypeUser): Promise<void> => {
    await User.update(userDTO, {
        where: {
            id: userID
        }
    });
};

const deleteUser = async (userID: string): Promise<number> => {
    const res = await User.update(
        { isDeleted: true },
        {
            where: {
                id: userID
            }
        }
    );
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
export {
    createUser,
    getUserOnLogin,
    getAutoSuggestUsers,
    getUser as getDBuser,
    updateUser as updateDBuser,
    deleteUser
};
