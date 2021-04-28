import { get, post } from "./api";
import { defaultsDeep } from "lodash";
import { divocConfig } from "../../utils/envConfig";

export const certify = async (identifier, data) => {
  const body = [
    defaultsDeep(
      {},
      {
        preEnrollmentCode: identifier,
        enrollmentType: divocConfig.enrollmentType, // TODO: What is this?
        programId: divocConfig.programId, // TODO: What is this?
      },
      data
    ),
  ];
  const path = "divoc/api/v1/certify";

  /* this API method returns an empty response which is invalid JSON, so don't do anything but check the status code */
  return await post(path, body);
};

export const getCertificateStream = async (identifier) =>
  await get(`cert/api/certificatePDF/${identifier}`, {
    responseType: "stream",
  });
