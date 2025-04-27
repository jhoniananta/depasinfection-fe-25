export type UserProfile = {
  account_id: string;
  email: string;
  full_name: string;
  phone_number: string;
  role: string;
  events?: eventType[] | null; // array of events that the user registered to
};

export type EditProfileResponse = {
  message: string;
  account: {
    account_id: string;
    full_name: string;
    phone_number: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
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
    status: "PENDING" | "APPROVED" | "REJECTED" | "REVISION"; // asumsi status hanya 3 ini, bisa ditambah jika ada lagi
    event: string;
    sub_competition?: string;
    revision_message?: string | null;
    revision_status?: boolean;
    statement_letter: string;
    phase: string;
    payment_details: paymentDetails;
    team_details: {
      leader_details: ParticipantDetails;
      members_details: ParticipantDetails[];
    };

    teacher_details?: teacherDetails;

    submission_status?: boolean;

    submission_details?: {
      abstract: string | null;
      validation_sheet: string | null;
      poster: string | null;
      description: string | null;
    };
  },
];

export type teacherDetails = {
  teacher_email: string;
  teacher_name: string;
  teacher_phone: string;
};

export type ParticipantDetails = {
  participant_details_id: string;
  participant_id: string;
  role: "LEADER" | "MEMBER";
  name: string;
  email: string;
  nik: string | null;
  phone_number: string;
  nim: string | null;
  nisn: string | null;
  student_card: string;
  twibbon: string;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
};

export type paymentDetails = {
  payment_id: string;
  bank_id: number;
  amount: number;
  sender_account: string;
  sender_bank: string;
  proof: string;
  date_of_transfer: string; // ISO date string
};
