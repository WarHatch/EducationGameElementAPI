import express from 'express';
import bodyParser from 'body-parser';

import mainRouter from "./routes";
 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(mainRouter);

const port = 8090;

app.listen(port, () => console.log("Server running on port " + port));