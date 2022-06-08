import express from 'express';
import routes from '../Routes/routes.js';

const app = express();
const port = 3000;
app.use(express.json());

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

app.use('/', routes);

app.locals.users = [];

export default app;
