import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";

import mainRouter from "./routes";
 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// Serve static files
app.use(express.static("./src/data"));

app.use(mainRouter);

const port = 8090;

app.listen(port, () => console.log("Server running on port " + port));