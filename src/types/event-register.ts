import { Status } from "./status";

export type Event = {
  event_name: string;
  event_code: string;
  status: Status;
  participant_id: string;
};
