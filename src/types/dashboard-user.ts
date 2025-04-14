export type UserProfile = {
  account_id: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: string;
  events?: eventType[] | null; // array of events that the user registered to
};

export type eventType = {
  event_code: string;
  event_name: string;
  participant_id: string;
  status: string;
};

export type EventDetails = [
  {
    participant_id: string;
    team_name: string;
    university: string;
    school_address: string;
    integrity_pact: string;
    nationality: string;
    status: "PENDING" | "VERIFIED" | "REJECTED" | "REVISION"; // asumsi status hanya 3 ini, bisa ditambah jika ada lagi
    event: string;
    sub_competition?: string;
    revision_message?: string | null;
    revision_status?: boolean;
    statement_letter?: string;
    phase: string;
    payment_details: paymentDetails;
    team_details: {
      leader_details: ParticipantDetails;
      members_details: ParticipantDetails[];
    };
  },
];

export type ParticipantDetails = {
  participant_details_id: string;
  participant_id: string;
  role: "LEADER" | "MEMBER";
  name: string;
  email: string;
  nik: string;
  phone_number: string;
  nim: string | null;
  nisn: string;
  student_card: string;
  twibbon: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type paymentDetails = {
  payment_id: string;
  amount: number;
  sender_account: string;
  sender_bank: string;
  proof: string;
  date_of_transfer: string; // ISO date string
};
