import { User } from "./userModel";
import express from "express";
const router = express.Router();

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
app.use(express.json());
app.locals.users = [];

router.post("/user", function (req: express.Request, res: express.Response): void {
  app.locals.users.push(req.body);
  res.status(204).send();
});

function getAutoSuggestUsers(loginSubstring:string,limit:number){
  app.locals.users.sort((a, b) => a.login.localeCompare(b.login));
  let filteredUsers = app.locals.users.filter(function (user:User){
    if(this.count<limit && user.login.includes(loginSubstring)){
      this.count++;
      return true;
    }
  },{count:0});
  return filteredUsers;
}
router.get(
  "/users",
  function (req: express.Request, res: express.Response): void {
    const loginSubstring = req.query.loginSubstring;
    const limit = 5;
   const suggestedUsers:User[] = getAutoSuggestUsers(loginSubstring,limit);
   res.json(suggestedUsers);
  }
);
router.get(
  "/user/:id",
  function (req: express.Request, res: express.Response): void {
    let foundUser: User = app.locals.users.find(
      (user: User) => user.id === req.params.id
    );
    if (!foundUser) {
      res
        .status(404)
        .json({ message: `User with id ${req.params.id} not found` });
    } else {
      res.json(foundUser);
    }
  }
);

router.put("/user/:id", function (req: express.Request, res: express.Response) {
  let foundUserIndex: number = app.locals.users.findIndex(
    (user: User) => user.id === req.params.id
  );
  if (foundUserIndex === -1) {
    app.locals.users.push(req.body);
  } else {
    app.locals.users[foundUserIndex] = req.body;
  }
  res.status(204).send();
});

router.delete(
  "/user/:id",
  function (req: express.Request, res: express.Response): void {
    let foundUserIndex: number = app.locals.users.findIndex(
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
  }
);

app.use("/", router);
