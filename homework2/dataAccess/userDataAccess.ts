import { User as TypeUser } from '../types/userType';
import User from '../models/userModel.js';
import { Op } from 'sequelize';

const createUser = async (userDTO: TypeUser): Promise<void> => {
    await User.create(userDTO);
};

const getUser = async (userID: string) => {
    const user = await User.findByPk(userID);
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
    return affectedCount;
};
export {
    createUser,
    getAutoSuggestUsers,
    getUser as getDBuser,
    updateUser as updateDBuser,
    deleteUser
};
