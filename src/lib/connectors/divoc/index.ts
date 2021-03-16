import { get, post, requestRaw } from "./api";
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
  console.log(`Sending DIVOC certificate generation request to ${path}:`, body);

  /* this API method returns an empty response which is invalid JSON, so don't do anything but check the status code */
  const response = await requestRaw(
    path,
    {
      body,
    },
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  console.log(response);
  return;
};

export const getCertificateStream = async (identifier) => {
  const response = await requestRaw(`cert/api/certificatePDF/${identifier}`);

  return response.body;
};
