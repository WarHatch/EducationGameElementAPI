import express from 'express';
import bodyParser from 'body-parser';

import mainRouter from "./routes";
 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(mainRouter);

const port = 8090;

app.listen(port, () => console.info("Server running on port " + port));