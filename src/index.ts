import https from "https";
import express from "express";
import { SSLOptions } from "./ssl/options";

let PROTOCOL: "http" | "https";
let PORT: 8080 | 8443;
const HOSTNAME: "localhost" = "localhost";
const { NODE_ENV } = process.env;

const app = express();

app.get("/", (req, res) => res.send("Hello world!!"));
app.listen(8080, () => console.log(`Mode: ${NODE_ENV}`));
