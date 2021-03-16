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

export type Attribute = {
  attribute: string;
  created: string;
  lastUpdated: string;
  storedBy: string;
  displayName: string;
  valueType: string;
  value: string;
};

export type Event = any;
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
