import https from "https";
import express from "express";
import path from "path";
import cors from "cors";
import cookieParser from "cookie-parser";
import { enableSSL, ISSLOptions } from "./ssl/options";
import { startup, NODE_ENV } from "./utils/startup.util";

import { api } from "./apis/index.api";

// Global variables
let PROTOCOL: "http" | "https";
let PORT: 8080 | 8443;
const HOSTNAME = "localhost";

const app = express();

app.use(cookieParser());
// This middleware allows me to send requests in JSON format so the server parses the request properly.
app.use(express.json());

if (NODE_ENV === "development") {
  // Development phase
  PROTOCOL = "http";
  PORT = 8080;

  // To enable cross-origin requests - I am sending API requests from https://localhost:3000 as it is standard with (SSL/TLS enabled) create-react-app
  app.use(
    cors({
      // Required to make cookies work in development phase - cookies weren't being recieved on the frontend (since frontend is hosted on port 3000 and not served via Express and static content)
      credentials: true,
      origin: "https://localhost:3000",
    })
  );

  app.listen(PORT, () => startup(PROTOCOL, HOSTNAME, PORT));
}

// REST routes need to be between these two dev/prod configurations because I need CORS enabled in dev and I need REST enabled before sending the index.html in prod
// API route
app.use("/api", api);

if (NODE_ENV === "production") {
  // Production phase
  PROTOCOL = "https";
  PORT = 8443;
  const SSLOptions: ISSLOptions = enableSSL();

  // Serving static content from the static folder - which is just a built frontend (i.e. create-react-app build)
  app.use(express.static(path.resolve(__dirname, "../static")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../static/index.html"));
  });

  https
    .createServer(SSLOptions, app)
    .listen(PORT, () => startup(PROTOCOL, HOSTNAME, PORT));
}
