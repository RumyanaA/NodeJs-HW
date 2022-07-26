import express from 'express';
import winstonLogger from '../loggers/winstonLogger.js';
import expressLogger from '../loggers/expressLogger.js';
import { addGroup, addUsersToGroup, getAllGroups, getGroupByID, removeGroup, updateGroup } from '../services/groupServices.js';
const router = express.Router();
router.post('/group', expressLogger('addGroup()'), async (req, res) => {
    try {
        const groupDTO = req.body;
        await addGroup(groupDTO);
        res.status(204).send();
    }
    catch (e) {
        winstonLogger.error(e.message);
        res.status(500).send();
    }
});
router.get('/group/:id', expressLogger('getGroupByID()'), async (req, res) => {
    try {
        const groupID = req.params.id;
        const foundGroup = await getGroupByID(groupID);
        if (!foundGroup) {
            res.status(404).json({ message: `Group with id ${groupID} not found` });
        }
        else {
            res.json(foundGroup);
        }
    }
    catch (e) {
        winstonLogger.error(e.message);
        res.status(500).send();
    }
});
router.get('/groups', expressLogger('getAllGroups()'), async (req, res) => {
    try {
        const suggestedUsers = await getAllGroups();
        res.json(suggestedUsers);
    }
    catch (e) {
        winstonLogger.error(e.message);
        res.status(500).send();
    }
});
router.put('/group/:id', expressLogger('updateGroup()'), async (req, res) => {
    try {
        const groupID = req.params.id;
        const groupDTO = req.body;
        await updateGroup(groupID, groupDTO);
        res.status(204).send();
    }
    catch (e) {
        winstonLogger.error(e.message);
        res.status(500).send();
    }
});
router.put('/user_group', expressLogger('addUsersToGroup()'), async (req, res) => {
    try {
        const user_ids = Array.isArray(req.query.userIds)
            ? req.query.userIds
            : [req.query.userIds];
        const group_id = req.query.groupId;
        await addUsersToGroup(group_id, user_ids);
        res.status(204).send();
    }
    catch (e) {
        winstonLogger.error(e.message);
        res.status(500).send();
    }
});
router.delete('/group/:id', expressLogger('removeGroup()'), async (req, res) => {
    try {
        const groupID = req.params.id;
        const { status, message } = await removeGroup(groupID);
        res.status(status).json(message);
    }
    catch (e) {
        winstonLogger.error(e.message);
        res.status(500).send();
    }
});
export default router;
//# sourceMappingURL=groups.js.map