import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";

import config from "./config";
import mainRouter from "./routes";

console.log(config);
 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// Quick body logger
app.use((req, res, next) => {
  console.log(req.body);
  next();
});

// Serve static files
// TODO: solve hardcoded production path
const staticFilePath = process.env.NODE_ENV === "production" ? "/app/dist/ReactGenerators/dist" :
  __dirname + "/ReactGenerators/dist";
console.log("Static files servet at: " + staticFilePath);
app.use(express.static(staticFilePath));

app.use(mainRouter);

const { port } = config;
app.listen(port, () => console.log("Server running on port " + port));