import express from 'express';
import { User } from '../Models/userModel';
import app from '../Server/server.js';

const addUser = (req: express.Request, res: express.Response): void => {
    app.locals.users.push(req.body);
    res.status(204).send();
};

const getUser = (req: express.Request, res: express.Response): void => {
    const foundUser: User = app.locals.users.find(
        (user: User) => user.id === req.params.id
    );
    if (!foundUser) {
        res
            .status(404)
            .json({ message: `User with id ${req.params.id} not found` });
    } else {
        res.json(foundUser);
    }
};

function getAutoSuggestUsers(loginSubstring: string, limit: number):User[] {
    app.locals.users.sort((a: User, b: User) => a.login.localeCompare(b.login));
    const filteredUsers = app.locals.users.filter(
        function (user: User): boolean {
            if (this.count < limit && user.login.includes(loginSubstring)) {
                this.count++;
                return true;
            }
        },
        { count: 0 }
    );
    return filteredUsers;
}

const getUsers = (req: express.Request, res: express.Response): void => {
    const loginSubstring = req.query.loginSubstring;
    const limit = 5;
    const suggestedUsers: User[] = getAutoSuggestUsers(loginSubstring, limit);
    res.json(suggestedUsers);
};

const updateUser = (req: express.Request, res: express.Response): void => {
    const foundUserIndex: number = app.locals.users.findIndex(
        (user: User) => user.id === req.params.id
    );
    if (foundUserIndex === -1) {
        app.locals.users.push(req.body);
    } else {
        app.locals.users[foundUserIndex] = req.body;
    }
    res.status(204).send();
};

const removeUser = (req: express.Request, res: express.Response): void => {
    const foundUserIndex: number = app.locals.users.findIndex(
        (user: User) => user.id === req.params.id
    );
    if (foundUserIndex === -1) {
        res
            .status(404)
            .json({ message: `User with id ${req.params.id} not found` });
    } else {
        app.locals.users[foundUserIndex].isDeleted = true;
        res.status(204).send();
    }
};

export { addUser, getUser, getUsers, updateUser, removeUser };
