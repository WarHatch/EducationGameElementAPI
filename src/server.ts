import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import config from "./config";
import mainRouter from "./routes";
 
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });

// FIXME: install logger

// Serve static files
let reactGeneratorsStaticPath = "./src/ReactGenerators/dist"
// FIXME: untested path
if (process.env.NODE_ENV === "production") reactGeneratorsStaticPath = "./ReactGenerators/dist";
app.use(express.static(reactGeneratorsStaticPath));

app.use(mainRouter);


const { port } = config;
app.listen(port, () => console.log("Server running on port " + port));