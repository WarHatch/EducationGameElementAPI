import express from 'express';

import mainRouter from "./routes";
 
const app = express();

app.use(mainRouter);

const port = 8090;

app.listen(port, () => console.info("Server running on port " + port));