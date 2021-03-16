import path from "path";
import express from "express";
import morgan from "morgan";
import generateCertificate from "./handlers/generateCertificate";
import { getTrackedEntityInstance } from "./connectors/dhis2";

export const start = (port: any) => {
  const app = express();

  // define a route handler for the default home page
  app.use(express.static(path.join(__dirname, "../../public")));
  app.use(morgan("combined"));

  app.use(express.json());
  app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

  app.get("/dhis2/tei/:id", async (req, res) => {
    const id = req.params.id;
    if (!id) {
      res.status(400).send("Invalid request");
      return;
    }

    res.json(await getTrackedEntityInstance(id));
  });
  app.post("/certificate/generate", generateCertificate);

  // start the Express server
  app.listen(port, () => {
    console.log(`server started at http://localhost:${port}`);
  });
};
