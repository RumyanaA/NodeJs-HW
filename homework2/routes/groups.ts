import express from 'express';
import myLogger from '../utilities/logging.js';
import {
    addGroup,
    addUsersToGroup,
    getAllGroups,
    getGroupByID,
    removeGroup,
    updateGroup
} from '../services/groupServices.js';
const router = express.Router();

router.post('/group', myLogger('addGroup()'), async (req: express.Request, res: express.Response) => {
    const groupDTO = req.body;
    await addGroup(groupDTO);
    res.status(204).send();
});

router.get(
    '/group/:id',
    myLogger('getGroupByID()'),
    async (req: express.Request, res: express.Response) => {
        const groupID = req.params.id;
        const foundGroup = await getGroupByID(groupID);
        if (!foundGroup) {
            res.status(404).json({ message: `Group with id ${groupID} not found` });
        } else {
            res.json(foundGroup);
        }
    }
);

router.get('/groups', myLogger('getAllGroups()'), async (req: express.Request, res: express.Response) => {
    const suggestedUsers = await getAllGroups();
    res.json(suggestedUsers);
});

router.put(
    '/group/:id',
    myLogger('updateGroup()'),
    async (req: express.Request, res: express.Response) => {
        const groupID = req.params.id;
        const groupDTO = req.body;
        await updateGroup(groupID, groupDTO);
        res.status(204).send();
    }
);

router.put(
    '/user_group',
    myLogger('addUsersToGroup()'),
    async (req: express.Request, res: express.Response) => {
        const user_ids = Array.isArray(req.query.userIds)
            ? req.query.userIds
            : [req.query.userIds];
        const group_id = req.query.groupId;
        await addUsersToGroup(group_id, user_ids);
        res.status(204).send();
    }
);

router.delete(
    '/group/:id',
    myLogger('removeGroup()'),
    async (req: express.Request, res: express.Response) => {
        const groupID = req.params.id;
        const { status, message } = await removeGroup(groupID);
        res.status(status).json(message);
    }
);

export default router;
