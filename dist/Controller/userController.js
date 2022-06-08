import app from '../Server/server.js';
const addUser = (req, res) => {
    app.locals.users.push(req.body);
    res.status(204).send();
};
const getUser = (req, res) => {
    const foundUser = app.locals.users.find((user) => user.id === req.params.id);
    if (!foundUser) {
        res
            .status(404)
            .json({ message: `User with id ${req.params.id} not found` });
    }
    else {
        res.json(foundUser);
    }
};
function getAutoSuggestUsers(loginSubstring, limit) {
    app.locals.users.sort((a, b) => a.login.localeCompare(b.login));
    const filteredUsers = app.locals.users.filter(function (user) {
        if (this.count < limit && user.login.includes(loginSubstring)) {
            this.count++;
            return true;
        }
    }, { count: 0 });
    return filteredUsers;
}
const getUsers = (req, res) => {
    const loginSubstring = req.query.loginSubstring;
    const limit = 5;
    const suggestedUsers = getAutoSuggestUsers(loginSubstring, limit);
    res.json(suggestedUsers);
};
const updateUser = (req, res) => {
    const foundUserIndex = app.locals.users.findIndex((user) => user.id === req.params.id);
    if (foundUserIndex === -1) {
        app.locals.users.push(req.body);
    }
    else {
        app.locals.users[foundUserIndex] = req.body;
    }
    res.status(204).send();
};
const removeUser = (req, res) => {
    const foundUserIndex = app.locals.users.findIndex((user) => user.id === req.params.id);
    if (foundUserIndex === -1) {
        res
            .status(404)
            .json({ message: `User with id ${req.params.id} not found` });
    }
    else {
        app.locals.users[foundUserIndex].isDeleted = true;
        res.status(204).send();
    }
};
export { addUser, getUser, getUsers, updateUser, removeUser };
//# sourceMappingURL=userController.js.map