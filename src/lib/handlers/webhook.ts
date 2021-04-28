import type { TrackedEntityInstance } from "../../@types/dhis2";
import { getTrackedEntityInstance } from "../connectors/dhis2";
import { asyncDoGenerateCertificate } from "./generateCertificate";
import {
  vaccinationProgram,
  vaccinationProgramStage,
} from "../utils/dhis2divocMapping";

export const handleProgramNotification = async (req, res) => {
  const { tracked_entity_id: id, program_id: programId } = req.body;

  if (!id || !programId) {
    console.error("Bad request", req.body);
    res.status(400).send("Bad request");
    return;
  }

  if (programId !== vaccinationProgram) {
    res
      .status(200)
      .send(
        `Program ${programId} for TEI ${id} is not the expected vaccination program ${vaccinationProgram}, skipping`
      );
    return;
  }
  res
    .status(200)
    .send(`Successfully queued certificate generation for TEI ${id}`);

  try {
    // Ensure the TEI exists before returning - this could also be async if desired
    const tei: TrackedEntityInstance = await getTrackedEntityInstance(id);

    // Don't wait for this to finish - the certificate will be generated asynchronously!
    asyncDoGenerateCertificate(id, tei).catch((e) => {
      // Do nothing
    });
  } catch (e) {
    console.error(`Failed to generate certificate for TEI ${id}`, String(e));
  }
};

export const handleProgramStageNotification = (req, res) => {
  const {
    tracked_entity_id: id,
    program_id: programId,
    program_stage_id: programStageId,
  } = req.body;

  if (!id || !programId || !programStageId) {
    console.error("Bad request", req.body);
    res.status(400).send("Bad request");
    return;
  }

  if (
    programId !== vaccinationProgram ||
    programStageId !== vaccinationProgramStage
  ) {
    res
      .status(200)
      .send(
        `Program stage ${programStageId} for TEI ${id} is not the expected vaccination program stage ${vaccinationProgramStage} (or programs do not match), skipping`
      );
    return;
  }

  try {
    // Ensure the TEI exists before returning - this could also be async if desired
    getTrackedEntityInstance(id).then((tei) => {
      asyncDoGenerateCertificate(id, tei);
    });
  } catch (e) {
    console.error(String(e));
    res
      .status(500)
      .send(`Failed to queue certificate generation for TEI ${id}`);
  }

  res.status(200).send(`Queued certificate generation for TEI ${id}`);
};
