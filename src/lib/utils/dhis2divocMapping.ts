import type { TrackedEntityInstance } from "../../@types/dhis2";

const parseFieldsetBy = (set, key) =>
  set.reduce((attrs, attr) => {
    attrs[attr[key]] = attr.value;
    return attrs;
  }, {});

export const divocPayloadFromTEI = (tei: TrackedEntityInstance) => {
  const attrs = parseFieldsetBy(tei.attributes, "displayName");
  return {
    recipient: {
      name: attrs["Given name"] + " " + attrs["Family name"],
      dob: attrs["Date of birth (age)"],
      gender: attrs["Sex"],
      identity: attrs["National ID"],
    },
    // TODO: Get vaccination details from TEI program enrollment
  };
};
