import { divocPayloadFromTEI } from "../utils/dhis2divocMapping";

import { certify, getCertificateStream } from "../connectors/divoc";
import {
  addCertificateEvent,
  getTrackedEntityInstance,
} from "../connectors/dhis2";
import type { TrackedEntityInstance } from "../../@types/dhis2";
import chalk from "chalk";

export const asyncDoGenerateCertificate = async (
  id: string,
  tei: TrackedEntityInstance
) => {
  try {
    await certify(id, divocPayloadFromTEI(tei));
    const fileStream = await getCertificateStream(id);

    await addCertificateEvent(tei, fileStream);
  } catch (e) {
    console.error(
      chalk.red(
        `[generate] Failed to generate certificate for TEI ${id}`,
        String(e)
      )
    );
    throw e;
  }
};

export const generateSync = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    console.error(`Bad request`, req.body);
    res.status(400).send("Bad request");
    return;
  }
  try {
    // Ensure the TEI exists before returning
    const tei: TrackedEntityInstance = await getTrackedEntityInstance(id);
    await asyncDoGenerateCertificate(id, tei);

    res
      .status(201)
      .send(`Successfully generated vaccination certificate for TEI ${id}`);
  } catch (e) {
    res
      .status(500)
      .send(`Failed to generate vaccination certificate for TEI ${id}`);
  }
};

export const generate = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    console.error(`Bad request`, req.body);
    res.status(400).send("Bad request");
    return;
  }
  try {
    // Ensure the TEI exists before returning - this could also be async if desired
    const tei: TrackedEntityInstance = await getTrackedEntityInstance(id);

    // Don't wait for this to finish - the certificate will be generated asynchronously!
    asyncDoGenerateCertificate(id, tei).catch((e) => {
      // Do nothing
    });

    res
      .status(201)
      .send(`Successfully queued certificate generation for TEI ${id}`);
  } catch (e) {
    console.error(String(e));
    res.status(500).send(`Couldn't retrieve TEI ${id}`);
  }
};
