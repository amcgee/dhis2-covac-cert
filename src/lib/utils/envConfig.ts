export const dhis2config = {
  baseUrl: process.env.DHIS2_BASE_URL || "https://interop.dhis2.org/covac",
  apiVersion: process.env.DHIS2_API_VERSION || 35,
  username: process.env.DHIS2_USERNAME || "",
  password: process.env.DHIS2_PASSWORD || "",

  vaccinationProgram: process.env.DHIS2_VACCINATION_PROGRAM || "yDuAzyqYABS",
  certificationProgramStage:
    process.env.DHIS2_VACCINATION_PROGRAM_STAGE || "bA6Syyw5ddu",
  captureOrgUnit: process.env.DHIS2_CAPTURE_ORG_UNIT || "V5XvX1wr1kF",
  certificateDataElement:
    process.env.DHIS2_CERTIFICATE_DATA_ELEMENT || "ycKP8dtKNoF",
};

export const divocConfig = {
  baseUrl: process.env.DIVOC_BASE_URL || "http://52.172.216.52",
  token: process.env.DIVOC_TOKEN || "",
};
