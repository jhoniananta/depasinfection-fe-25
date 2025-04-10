import { Status } from "./status";

export type Event = {
  event_name: string;
  event_code: string;
  status: Status;
  participant_id: string;
};

export type UDSRCRegisterRequest = {
  participants_data: {
    team_identity: {
      team_name: string;
      university: string;
      nationality: string;
      sub_competition: "POSTER" | "THREE_MOP";
      statement_letter: string; // file path
    };
    leader_identity: {
      name: string;
      email: string;
      nik: string | null;
      nim: string | null;
      phone_number: string;
      student_card: string; // file path
      twibbon: string; // file path
      role: "LEADER";
    };
    member_identity: {
      name: string;
      email: string;
      nik: string | null;
      nim: string | null;
      phone_number: string;
      student_card: string; // file path
      twibbon: string; // file path
      role: "MEMBER";
    }[];
  };
  payment_data: {
    amount: number;
    sender_bank_name: string;
    sender_name: string;
    date_of_transfer: string; // ISO format
    proof: string; // file path
    bank_id: number;
  };
};

export type UDSRCRegisterResponse = {
  registrants_details: {
    team_details: {
      participant_id: string;
      team_name: string;
      university: string;
      nationality: string;
      status: string;
      event: string;
      sub_competition: string;
    };
    leader_details: {
      participant_details_id: string;
      participant_id: string;
      role: "LEADER";
      name: string;
      email: string;
      nik: string | null;
      phone_number: string;
      nim: string | null;
      nisn: string | null;
      student_card: string;
      twibbon: string;
      created_at: string; // ISO format
      updated_at: string;
      deleted_at: string | null;
    };
    members_details: {
      name: string;
      email: string;
      nik: string | null;
      nim: string | null;
      phone_number: string;
      student_card: string;
      twibbon: string;
      role: "MEMBER";
    }[];
  };
  payment_details: {
    payment_id: string;
    amount: number;
    sender_account: string;
    sender_bank: string;
    proof: string;
    date_of_transfer: string; // ISO format
  };
};
