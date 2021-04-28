import type {
  EventsPayload,
  TrackedEntityInstance,
} from "../../../@types/dhis2";
import { get, uploadFile, post } from "./api";
import { dhis2config as config } from "../../utils/envConfig";

export const getTrackedEntityInstance = (id) => {
  return get(
    `trackedEntityInstances/${id}?fields=*&program=${config.vaccinationProgram}`
  );
};
export const getVaccinationEvents = () => {};
export const test = async () => {
  return await get(`programs/${config.vaccinationProgram}`);
};

const printCurrentDate = () => {
  const date = new Date();
  let day = String(date.getDate() + 1);
  if (day.length === 1) {
    day = "0" + day;
  }
  let month = String(date.getMonth() + 1);
  if (month.length === 1) {
    month = "0" + month;
  }
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};
export const addCertificateEvent = async (
  tei: TrackedEntityInstance,
  fileStream
) => {
  const response = await uploadFile(fileStream);

  const fileResourceId = response.response?.fileResource?.id;
  if (response.httpStatus !== "Accepted" || !fileResourceId) {
    throw new Error("Failed to upload certificate fileResource");
  }

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
            dataElement: config.certificateDataElement,
            value: fileResourceId,
          },
        ],
        status: "COMPLETED",
        eventDate: printCurrentDate(),
      },
    ],
  };

  try {
    return await post("events", eventsPayload);
  } catch (e) {
    console.error(
      "Request failed, attempting to print import summary:",
      JSON.stringify(
        e.response?.data?.response?.importSummaries?.map((summary) => ({
          description: summary.description,
          status: summary.status,
          importCount: summary.importCount,
          conflicts: summary.conflicts,
          reference: summary.reference,
        })),
        undefined,
        2
      )
    );
    throw e;
  }
};
