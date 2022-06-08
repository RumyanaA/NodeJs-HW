import express from 'express';
import validateSchema from '../utils.js';
import userSchema from '../Schema/userSchema.js';
import {
    addUser,
    getUser,
    getUsers,
    updateUser,
    removeUser
} from '../Controller/userController.js';
const router = express.Router();

router.post('/user', validateSchema(userSchema), addUser);
router.get('/user/:id', getUser);
router.get('/users', getUsers);
router.put('/user/:id', validateSchema(userSchema), updateUser);
router.delete('/user/:id', removeUser);

export default router;
