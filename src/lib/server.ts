import path from "path";
import express from "express";
import morgan from "morgan";
import { generate, generateSync } from "./handlers/generateCertificate";

export const start = (port: any) => {
  const app = express();

  // define a route handler for the default home page
  app.use(express.static(path.join(__dirname, "../../public")));
  app.use(morgan("combined"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.post("/certificate/generate", generate);
  app.post("/certificate/generateSync", generateSync);

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
};
