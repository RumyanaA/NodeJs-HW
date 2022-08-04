import express from 'express';
import winstonLogger from '../loggers/winstonLogger.js';
import expressLogger from '../loggers/expressLogger.js';
import {
    addGroup,
    addUsersToGroup,
    getAllGroups,
    getGroupByID,
    removeGroup,
    updateGroup
} from '../services/groupServices.js';
import executionTimer from '../middlewares/executionTimer.js';

const router = express.Router();

router.post(
    '/group',
    expressLogger('addGroup()'),
    executionTimer('addGroup()'),
    async (req: express.Request, res: express.Response) => {
        try {
            const groupDTO = req.body;
            await addGroup(groupDTO);
            res.status(204).send();
        } catch (e) {
            winstonLogger.error(
                `method: ${req.method}, arguments: ${JSON.stringify(req.body)}, error message: ${e.message}`
            );
            res.status(500).send();
        }
    }
);

router.get(
    '/group/:id',
    expressLogger('getGroupByID()'),
    executionTimer('getGroupByID()'),
    async (req: express.Request, res: express.Response) => {
        try {
            const groupID = req.params.id;
            const foundGroup = await getGroupByID(groupID);
            if (!foundGroup) {
                res.status(404).json({ message: `Group with id ${groupID} not found` });
            } else {
                res.json(foundGroup);
            }
        } catch (e) {
            winstonLogger.error(
                `method: ${req.method}, arguments: ${
                    req.params.id
                }, error message: ${e.message}`
            );
            res.status(500).send();
        }
    }
);

router.get(
    '/groups',
    expressLogger('getAllGroups()'),
    executionTimer('getAllGroups()'),
    async (req: express.Request, res: express.Response) => {
        try {
            const suggestedUsers = await getAllGroups();
            res.json(suggestedUsers);
        } catch (e) {
            winstonLogger.error(
                `method: ${req.method},error message: ${e.message}`
            );
            res.status(500).send();
        }
    }
);

router.put(
    '/group/:id',
    expressLogger('updateGroup()'),
    executionTimer('updateGroup()'),
    async (req: express.Request, res: express.Response) => {
        try {
            const groupID = req.params.id;
            const groupDTO = req.body;
            await updateGroup(groupID, groupDTO);
            res.status(204).send();
        } catch (e) {
            winstonLogger.error(
                `method: ${req.method}, arguments: ${
                    req.params.id
                }, ${JSON.stringify(req.body)}, error message: ${e.message}`
            );
            res.status(500).send();
        }
    }
);

router.put(
    '/user_group',
    expressLogger('addUsersToGroup()'),
    executionTimer('addUsersToGroup()'),
    async (req: express.Request, res: express.Response) => {
        try {
            const user_ids = Array.isArray(req.query.userIds)
                ? req.query.userIds
                : [req.query.userIds];
            const group_id = req.query.groupId;
            await addUsersToGroup(group_id, user_ids);
            res.status(204).send();
        } catch (e) {
            winstonLogger.error(
                `method: ${req.method}, arguments: ${
                    req.query.groupId
                }, ${JSON.stringify(req.query.userIds)}, error message: ${e.message}`
            );
            res.status(500).send();
        }
    }
);

router.delete(
    '/group/:id',
    expressLogger('removeGroup()'),
    executionTimer('removeGroup()'),
    async (req: express.Request, res: express.Response) => {
        try {
            const groupID = req.params.id;
            const { status, message } = await removeGroup(groupID);
            res.status(status).json(message);
        } catch (e) {
            winstonLogger.error(
                `method: ${req.method}, arguments: ${req.params.id}, error message: ${e.message}`
            );
            res.status(500).send();
        }
    }
);

export default router;
