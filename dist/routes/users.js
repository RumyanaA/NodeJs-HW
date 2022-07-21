import express from 'express';
import validateSchema from '../utilities/utils.js';
import userSchema from '../schema/userSchema.js';
import { addUser, getUser, getUsers, updateUser, removeUser } from '../services/userServices.js';
const router = express.Router();
router.post('/user', validateSchema(userSchema), async (req, res) => {
    const userDTO = req.body;
    await addUser(userDTO);
    res.status(204).send();
});
router.get('/user/:id', async (req, res) => {
    const userID = req.params.id;
    const foundUser = await getUser(userID);
    if (!foundUser) {
        res.status(404).json({ message: `User with id ${userID} not found` });
    }
    else {
        res.json(foundUser);
    }
});
router.get('/users', async (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const suggestedUsers = await getUsers(loginSubstring);
    res.json(suggestedUsers);
});
router.put('/user/:id', validateSchema(userSchema), async (req, res) => {
    const userID = req.params.id;
    const userDTO = req.body;
    await updateUser(userID, userDTO);
    res.status(204).send();
});
router.delete('/user/:id', async (req, res) => {
    const userID = req.params.id;
    const { status, message } = await removeUser(userID);
    res.status(status).json(message);
});
export default router;
//# sourceMappingURL=users.js.map