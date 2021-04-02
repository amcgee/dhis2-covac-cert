// DHIS2/WHO COVAC Tracker (EIR) Package Version 1.1.2

/*
 * WHO SVC RC1 Minimum Data Set + (coding)
 *  * = required
 *  ** = conditionally-required
 * ---
 * Per Person
 * - Name* (N/A)
 * - Date of birth* (N/A)
 * - Unique identifier (N/A)
 * - Sex (state-defined)
 * ---
 * Per Vaccination Event
 * - Vaccine or prophylaxis* (ICD-11)
 * - Vaccine Brand* (state-defined)
 * - Vaccine Manufacture** (state-defined)
 * - Vaccine Market Authorization Holder** (state-defined)
 * - Vaccine Batch Number* (N/A)
 * - Date of Vaccination* (ISO 8601)
 * - Dose number* (N/A)
 * - Country of vaccination* (ISO 3166)
 * - Administering centre* (state-defined)
 * - Health worker signature** (N/A - paper only)
 * - Health worker id** (N/A)
 * - Disease or agent targeted (ICD-11)
 * - Due date of next dose (ISO 8601)
 */

import type {
  Enrollment,
  Event,
  TrackedEntityInstance,
} from "../../@types/dhis2";

// From WHO COVAC Tracker package
// Incomplete, some challenges with mapping to DIVOC
// TODO: load mappings from configuration file
const vaccinationProgram = "yDuAzyqYABS";
const vaccinationProgramStage = "a1jCssI2LkW";
const packageAttributes = {
  firstName: "s2slttllN6D",
  lastName: "CbvQnJ9vOOd",
  dob: "zTWSj3Lg5KP",
  nationalId: "aec8etc85Rz",
  sex: "kbwzu78u3JT",
  address: undefined, // TODO: Convert from long text...?
  phone: "ciCR6BBvIT4",
};

const packageDataElements = {
  aefi: "m9PgIDAJGlF",
  allergy: "dWoveSw6b79",
  batchNumber: "Yp1F4txx8tm",
  cardioDisease: "LNHAYF3qdZl",
  lungDisease: "C0Bony47eKp",
  diabetes: "TT1h0vGu5da",
  doseExpiry: "YTQulAldGOs",
  doseNumber: "LUIsbsm3okG",
  immunodeficiency: "MuZ9dMVXpuM",
  lastDose: "DSOWCIdQ8Tr",
  malignancy: "xVxLMku5DMX",
  multipleProductsUsed: "OAxinuYFDG6",
  neurologicalOrNeuromuscular: "VCetMtYu1DY",
  pregnancy: "BfNZcj99yz4",
  pregnancyGestation: "CBAs12YL4g7",
  previouslyInfected: "LOU9t0aR0z7",
  renalDisease: "gW4pd818Sw8",
  suggestedNextDose: "FFWcps4MfuH",
  totalDoses: "PamkjF1JUnE",
  underlyingCondition: "bCtWZGjSWM8",
  underlyingConditionOther: "dpyQUtizp7s",
  vaccineManufacturer: "rpkH9ZPGJcX",
  vaccineName: "bbnyNYD1wgS",
};

const parseFieldsetBy = <T>(set: T[], key, valueKey = "value") =>
  set.reduce((attrs, attr) => {
    attrs[attr[key]] = attr[valueKey];
    return attrs;
  }, {});

const findVaccinationEvents = (enrollments: Enrollment[]) => {
  return enrollments
    .filter((enrollment) => enrollment.program === vaccinationProgram)
    .reduce((vaccinationEvents, enrollment) => {
      enrollment.events.forEach((event) => {
        if (event.programStage === vaccinationProgramStage) {
          vaccinationEvents.push(event);
        }
      });
      return vaccinationEvents;
    }, [] as Event[]);
};

const findLatestVaccinationEvent = (
  enrollments: Enrollment[]
): Event | undefined =>
  findVaccinationEvents(enrollments)
    .sort(
      (a, b) =>
        new Date(b.eventDate).getDate() - new Date(a.eventDate).getDate()
    )
    .pop();

const mapRecipient = (tei: TrackedEntityInstance) => {
  const attrs = parseFieldsetBy(tei.attributes, "attribute");

  return {
    name:
      attrs[packageAttributes.firstName] +
      " " +
      attrs[packageAttributes.lastName],
    dob: attrs[packageAttributes.dob],
    gender: attrs[packageAttributes.sex],
    identity: attrs[packageAttributes.nationalId],
    contact: attrs[packageAttributes.phone]
      ? [`tel:${attrs[packageAttributes.phone]}`]
      : [],
    address: undefined, // TODO: make address object?
  };
};

const mapVaccinationEvent = (event: Event) => {
  const dataValues = parseFieldsetBy(event.dataValues, "dataElement");

  return {
    name: dataValues[packageDataElements.vaccineName],
    manufacturer: dataValues[packageDataElements.vaccineManufacturer],
    batch: dataValues[packageDataElements.batchNumber],
    date: event.eventDate, // TODO: Parse and format
    dose: dataValues[packageDataElements.doseNumber],
    totalDoses: dataValues[packageDataElements.totalDoses],
    effectiveStart: "UNKNOWN", // TODO
    effectiveUntil: "UNKNOWN", // TODO
  };
};

const mapVaccinator = (event: Event) => {
  return {
    name:
      event.createdByUserInfo.firstName + " " + event.createdByUserInfo.surname,
  };
};

const mapFacility = (event: Event) => {
  return {
    name: event.orgUnitName,
    address: undefined, // TODO
  };
};

export const divocPayloadFromTEI = (tei: TrackedEntityInstance) => {
  const vaccinationEvent: Event | undefined = findLatestVaccinationEvent(
    tei.enrollments
  );
  if (!vaccinationEvent) {
    return null;
  }
  const payload = {
    recipient: mapRecipient(tei),
    vaccination: mapVaccinationEvent(vaccinationEvent),
    vaccinator: mapVaccinator(vaccinationEvent),
    facility: mapFacility(vaccinationEvent),
  };

  console.log(payload);
  return payload;
};
