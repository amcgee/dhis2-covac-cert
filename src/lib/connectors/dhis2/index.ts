import { post, requestRaw } from "../divoc/api";
import { dummyCertRequest } from "../divoc/dummyCertRequest";
import { get, uploadFile } from "./api";

const config = {
  vaccinationProgram: process.env.DHIS2_VACCINATION_PROGRAM || "yDuAzyqYABS",
  certificationProgramStage:
    process.env.DHIS2_VACCINATION_PROGRAM_STAGE || "bA6Syyw5ddu",
  captureOrgUnit: process.env.DHIS2_ROOT_ORG_UNIT || "V5XvX1wr1kF",
};

export const getTrackedEntityInstance = (id) => {
  return get(`trackedEntityInstances/${id}`, {
    params: {
      program: config.vaccinationProgram,
    },
  });
};
export const getVaccinationEvents = () => {};
export const test = async () => {
  return await get(`programs/${config.vaccinationProgram}`);
};

const dummyEvent: EventPayload = {
  trackedEntityInstance: "v8rH0S3UZLE",
  program: "yDuAzyqYABS",
  programStage: "bA6Syyw5ddu",
  enrollment: "Se0W3T5TO8j",
  orgUnit: "V5XvX1wr1kF",
  notes: [],
  dataValues: [],
  status: "ACTIVE",
  eventDate: "2021-03-16",
};

export const addCertificateEvent = async (
  tei: TrackedEntityInstance,
  fileStream
) => {
  const fileResource = (await uploadFile(fileStream)).fileResource.id;

  const eventsPayload: EventsPayload = {
    events: [
      {
        trackedEntityInstance: tei.trackedEntityInstance,
        program: config.vaccinationProgram,
        programStage: config.certificationProgramStage,
        enrollment: tei.enrollments.find(
          (enrollment) => enrollment.program === config.vaccinationProgram
        )?.enrollment,
        orgUnit: config.captureOrgUnit,
        notes: [],
        dataValues: [
          {
            dataElement: "ycKP8dtKNoF",
            value: fileResource,
          },
        ],
        status: "COMPLETED",
        eventDate: "2021-03-15",
      },
    ],
  };

  return await post("events", {
    body: eventsPayload,
  });
};
