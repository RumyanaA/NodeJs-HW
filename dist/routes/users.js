import express from 'express';
import validateSchema from '../utilities/utils.js';
import userSchema from '../schema/userSchema.js';
import { addUser, loginUser, getUser, getUsers, updateUser, removeUser } from '../services/userServices.js';
import expressLogger from '../loggers/expressLogger.js';
import winstonLogger from '../loggers/winstonLogger.js';
import executionTimer from '../middlewares/executionTimer.js';
import checkToken from '../middlewares/checkToken.js';
const router = express.Router();
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const token = await loginUser(username, password);
        res.send(token);
    }
    catch (e) {
        winstonLogger.error(`method: ${req.method}, arguments: ${JSON.stringify(req.body)}, error message: ${e.message}`);
        res.status(500).send(e.message);
    }
});
router.post('/user', validateSchema(userSchema), expressLogger('addUser()'), executionTimer('addUser()'), async (req, res) => {
    try {
        const userDTO = req.body;
        await addUser(userDTO);
        res.status(204).send();
    }
    catch (e) {
        winstonLogger.error(`method: ${req.method}, arguments: ${JSON.stringify(req.body)}, error message: ${e.message}`);
        res.status(500).send();
    }
});
router.get('/user/:id', checkToken, expressLogger('getUser()'), executionTimer('getUser()'), async (req, res) => {
    try {
        const userID = req.params.id;
        const foundUser = await getUser(userID);
        if (!foundUser) {
            res.status(404).json({ message: `User with id ${userID} not found` });
        }
        else {
            res.json(foundUser);
        }
    }
    catch (e) {
        winstonLogger.error(`method: ${req.method}, arguments: ${JSON.stringify(req.params.id)}, error message: ${e.message}`);
        res.status(500).send();
    }
});
router.get('/users', checkToken, expressLogger('getUsers()'), executionTimer('getUsers()'), async (req, res) => {
    try {
        const loginSubstring = req.query.loginSubstring;
        const suggestedUsers = await getUsers(loginSubstring);
        res.json(suggestedUsers);
    }
    catch (e) {
        winstonLogger.error(`method: ${req.method}, arguments: ${req.query.loginSubstring}, error message: ${e.message}`);
        res.status(500).send();
    }
});
router.put('/user/:id', checkToken, validateSchema(userSchema), expressLogger('updateUser()'), executionTimer('updateUser()'), async (req, res) => {
    try {
        const userID = req.params.id;
        const userDTO = req.body;
        await updateUser(userID, userDTO);
        res.status(204).send();
    }
    catch (e) {
        winstonLogger.error(`method: ${req.method}, arguments: ${req.params.id}, ${JSON.stringify(req.body)}, error message: ${e.message}`);
        res.status(500).send();
    }
});
router.delete('/user/:id', checkToken, expressLogger('removeUser()'), executionTimer('removeUser()'), async (req, res) => {
    try {
        const userID = req.params.id;
        const { status, message } = await removeUser(userID);
        res.status(status).json(message);
    }
    catch (e) {
        winstonLogger.error(`method: ${req.method}, arguments: ${req.params.id}, error message: ${e.message}`);
        res.status(500).send();
    }
});
export default router;
//# sourceMappingURL=users.js.map