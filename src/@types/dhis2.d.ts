export type DataValue = {
  dataElement: string;
  value: string;
};
export type EventPayload = {
  trackedEntityInstance: string;
  program: string;
  programStage: string;
  enrollment?: string;
  orgUnit: string;
  notes: string[];
  dataValues: DataValue[];
  status:
    | "ACTIVE"
    | "COMPLETED"
    | "VISITED"
    | "SCHEDULE"
    | "OVERDUE"
    | "SKIPPED";
  eventDate: string;
};
export type EventsPayload = {
  events: EventPayload[];
};

export type Identifier = string;
export type DateString = string; // TODO
export type StatusString = string; // TODO: 'ACTIVE' | 'INACTIVE' | ...
export type UserInfo = {
  uid: Identifier;
  firstName: string;
  surname: string;
  username: string;
};

export type Relationship = any; // TODO

export type Attribute = {
  attribute: Identifier;
  created: DateString;
  lastUpdated: DateString;
  storedBy: string;
  displayName: string;
  valueType: string;
  value: string;
};

export type DataValue = {
  lastUpdated: DateString;
  created: DateString;
  dataElement: Identifier;
  value: string;
  providedElsewher: boolean;
  lastUpdatedByUserInfo: UserInfo;
};

export type Event = {
  storedBy: string;
  dueDate: DateString;
  program: Identifier;
  event: Identifier;
  programStage: Identifier;
  orgUnit: Identifier;
  trackedEntityInstance: Identifier;
  enrollment: Identifier;
  enrollmentStatus: StatusString;
  status: StatusString;
  orgUnitName: string;
  eventDate: DateString;
  attributeCategoryOptions: Identifier;
  lastUpdated: DateString;
  created: DateString;
  deleted: boolean;
  attributeOptionCombo: Identifier;

  lastUpdatedByUserInfo: UserInfo;
  createdByUserInfo: UserInfo;

  dataValues: DataValue[];
  notes: string[];
  relationships: Relationship[];
};
export type Relationship = any;

export type Enrollment = {
  attributes: [];
  created: string;
  createdAtClient: string;
  deleted: false;
  enrollment: string;
  enrollmentDate: string;
  events: Event[];
  incidentDate: string;
  lastUpdated: string;
  lastUpdatedAtClient: string;
  notes: string[];
  orgUnit: string;
  orgUnitName: string;
  program: string;
  relationships: Relationship[];
  status: string;
  storedBy: string;
  trackedEntityInstance: string;
  trackedEntityType: string;
};
export interface TrackedEntityInstance {
  trackedEntityInstance: string;
  attributes: Attribute[];
  enrollments: Enrollment[];
}
