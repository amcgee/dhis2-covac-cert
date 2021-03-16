import { get, post } from "./api";
import { dummyCertRequest } from "./dummyCertRequest";
import { defaultsDeep } from "lodash";

export const certify = async (identifier, data) => {
  const body = [
    defaultsDeep(
      {},
      {
        preEnrollmentCode: identifier,
      },
      data,
      dummyCertRequest
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
