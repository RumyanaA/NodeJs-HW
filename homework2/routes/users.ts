import express from 'express';
import validateSchema from '../utilities/utils.js';
import userSchema from '../schema/userSchema.js';
import {
    addUser,
    getUser,
    getUsers,
    updateUser,
    removeUser
} from '../services/userServices.js';
import expressLogger from '../loggers/expressLogger.js';
import winstonLogger from '../loggers/winstonLogger.js';

const router = express.Router();

router.post(
    '/user',
    validateSchema(userSchema),
    expressLogger('addUser()'),
    async (req: express.Request, res: express.Response) => {
        try {
            const userDTO = req.body;
            await addUser(userDTO);
            res.status(204).send();
        } catch (e) {
            winstonLogger.error(e.message);
            res.status(500).send();
        }
    }
);

router.get('/user/:id', expressLogger('getUser()'), async (req: express.Request, res: express.Response) => {
    try {
        const userID = req.params.id;
        const foundUser = await getUser(userID);
        if (!foundUser) {
            res.status(404).json({ message: `User with id ${userID} not found` });
        } else {
            res.json(foundUser);
        }
    } catch (e) {
        winstonLogger.error(e.message);
        res.status(500).send();
    }
});

router.get('/users',  expressLogger('getUsers()'), async (req: express.Request, res: express.Response) => {
    try {
        const loginSubstring = req.query.loginSubstring;
        const suggestedUsers = await getUsers(loginSubstring);
        res.json(suggestedUsers);
    } catch (e) {
        winstonLogger.error(e.message);
        res.status(500).send();
    }
});

router.put(
    '/user/:id',
    validateSchema(userSchema),
    expressLogger('updateUser()'),
    async (req: express.Request, res: express.Response) => {
        try {
            const userID = req.params.id;
            const userDTO = req.body;
            await updateUser(userID, userDTO);
            res.status(204).send();
        } catch (e) {
            winstonLogger.error(e.message);
            res.status(500).send();
        }
    }
);

router.delete(
    '/user/:id',
    expressLogger('removeUser()'),
    async (req: express.Request, res: express.Response) => {
        try {
            const userID = req.params.id;
            const { status, message } = await removeUser(userID);
            res.status(status).json(message);
        } catch (e) {
            winstonLogger.error(e.message);
            res.status(500).send();
        }
    }
);

export default router;
