import path from "path";
import express from "express";
import morgan from "morgan";
import { generate, generateSync } from "./handlers/generateCertificate";
import {
  handleProgramNotification,
  handleProgramStageNotification,
} from "./handlers/webhook";
import {
  clearSchedule,
  generateBatch,
  getSchedule,
  setSchedule,
} from "./handlers/generateBatch";

export const start = (port: any) => {
  const app = express();

  // define a route handler for the default home page
  app.use(express.static(path.join(__dirname, "../../public")));
  app.use(morgan("combined"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.post("/certificate/generate", generate);
  app.post("/certificate/generateSync", generateSync);

  app.post("/webhooks/program", handleProgramNotification);
  app.post("/webhooks/programStage", handleProgramStageNotification);

  app.post("/certificate/generateBatch", generateBatch);
  app.get("/schedule", getSchedule);
  app.post("/schedule", setSchedule);
  app.delete("/schedule", clearSchedule);

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
};
