export const dummyCertRequest = {
  preEnrollmentCode: "identifier",
  recipient: {
    name: "Megha Jain",
    dob: "1983-01-30",

    gender: "Female",
    nationality: "Indian",
    identity: "did:Driving License:100126",
    contact: ["tel:1111111312"],
    address: {
      addressLine1: "123, Jayanagar",
      addressLine2: "4th cross",
      district: "Bengaluru South",
      state: "Karnataka",
      pincode: 560024,
    },
  },
  vaccination: {
    name: "COVAXIN",
    batch: "MB3428BX",
    manufacturer: "Bharat Biotech",
    date: "2020-12-02T19:21:19.646Z",
    effectiveStart: "2020-12-15",
    effectiveUntil: "2021-01-15",
    dose: 1,
    totalDoses: 2,
  },
  vaccinator: {
    name: "Sooraj Singh",
  },
  facility: {
    name: "ABC Medical Center",
    address: {
      addressLine1: "123, Koramangala",
      addressLine2: "3rd cross",
      district: "Bengaluru South",
      state: "Karnataka",
      pincode: 560034,
    },
  },
};
