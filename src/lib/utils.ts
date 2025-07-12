"use client";

import { OKGDFormData, UDSRCFormData } from "@/types/form";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getSessionDefault(field: string) {
  if (typeof window === "undefined") return undefined;
  const stored = sessionStorage.getItem(field);
  return stored ? JSON.parse(stored).link : undefined;
}

export function getSessionStorageWithDefault(
  key: string,
  defaultValue: string,
) {
  const value = sessionStorage.getItem(key);
  if (value !== null) {
    try {
      const parsedValue = JSON.parse(value);
      return parsedValue.link !== undefined ? parsedValue.link : defaultValue;
    } catch {
      return defaultValue;
    }
  }
  return defaultValue;
}

export function removeSessionFile(fields: string | string[]) {
  if (typeof window === "undefined") return;

  const keys = Array.isArray(fields) ? fields : [fields];
  keys.forEach((key) => sessionStorage.removeItem(key));
}

export const getFeeInfoUDSRC = (
  nationality: string,
  subCompetition: string,
) => {
  const now = new Date();
  const wibNow = new Date(now.getTime() + 7 * 60 * 60 * 1000); // UTC+7

  const inRange = (start: string, end: string) =>
    wibNow >= new Date(start) && wibNow <= new Date(end);

  // !GANTI DIBAWAH INI
  if (inRange("2025-04-11T00:00:00+07:00", "2025-05-18T23:59:59+07:00")) {
    if (subCompetition === "poster-competition") {
      return nationality === "IDN"
        ? { label: "IDR150.002,00", value: 150002 }
        : { label: "$25.00", value: 25 };
    }
    if (subCompetition === "3-minutes-oral-competition") {
      return nationality === "IDN"
        ? { label: "IDR200.003,00", value: 200003 }
        : { label: "$30.00", value: 30 };
    }
  }

  if (inRange("2025-05-19T00:00:00+07:00", "2025-07-27T07:00:00")) {
    if (subCompetition === "poster-competition") {
      return nationality === "IDN"
        ? { label: "IDR200.002,00", value: 200002 }
        : { label: "$30.00", value: 30 };
    }
    if (subCompetition === "3-minutes-oral-competition") {
      return nationality === "IDN"
        ? { label: "IDR250.003,00", value: 250003 }
        : { label: "$35.00", value: 35 };
    }
  }

  // default/fallback error: null means intentionally invalid/missing
  return { label: "Invalid fee", value: "error" };
};

export const getFeeInfoOKGD = () => {
  const now = new Date();
  const wibNow = new Date(now.getTime() + 7 * 60 * 60 * 1000); // UTC+7

  const inRange = (start: string, end: string) =>
    wibNow >= new Date(start) && wibNow <= new Date(end);

  //!GANTI DIBAWAH INI
  if (inRange("2025-04-11T00:00:00+07:00", "2025-05-18T23:59:59+07:00")) {
    return { label: "IDR180.001,00", value: 180001 };
  }
  if (inRange("2025-05-19T00:00:00+07:00", "2025-07-27T07:00:00")) {
    return { label: "IDR200.001,00", value: 200001 };
  }
  // fallback
  return { label: "Invalid fee", value: "error" };
};

export function transformFormDataToPayloadUDSRC(
  data: UDSRCFormData,
  uploads: Record<string, string | undefined>,
) {
  return {
    participants_data: {
      team_identity: {
        team_name: data.teamName,
        university: data.university,
        nationality: data.nationality,
        sub_competition:
          data.subCompetition === "poster-competition"
            ? "POSTER"
            : data.subCompetition === "3-minutes-oral-competition"
              ? "THREE_MOP"
              : "",
        statement_letter: uploads.statementLetter,
      },
      leader_identity: {
        name: data.leaderName,
        email: data.leaderEmail,
        nik: data.leaderNIK || null,
        nim: data.leaderNIM || null,
        phone_number: data.leaderWhatsApp,
        student_card: uploads.leaderStudentCard,
        twibbon: uploads.leaderTwibbonProof,
        role: "LEADER",
      },
      member_identity: [
        {
          name: data.member1Name,
          email: data.member1Email,
          nik: data.member1NIK || null,
          nim: data.member1NIM || null,
          phone_number: data.member1WhatsApp,
          student_card: uploads.member1StudentCard,
          twibbon: uploads.member1TwibbonProof,
          role: "MEMBER",
        },
        {
          name: data.member2Name,
          email: data.member2Email,
          nik: data.member2NIK || null,
          nim: data.member2NIM || null,
          phone_number: data.member2WhatsApp,
          student_card: uploads.member2StudentCard,
          twibbon: uploads.member2TwibbonProof,
          role: "MEMBER",
        },
      ],
    },
    payment_data: {
      amount: data.amount,
      sender_bank_name: data.bankName,
      sender_name: data.senderName,
      date_of_transfer: data.dateOfTransfer.toISOString(),
      proof: uploads.proofOfTransfer,
      bank_id: data.bankId,
    },
  };
}

export function transformFormDataToPayloadOKGD(
  data: OKGDFormData,
  uploads: Record<string, string | undefined>,
) {
  return {
    participants_data: {
      team_identity: {
        team_name: data.teamName,
        school: data.schoolName,
        school_address: data.schoolAddress,
        integrity_pact: uploads.integrityPact,
        event_id: 3,
      },
      leader_identity: {
        name: data.leaderName,
        email: data.leaderEmail,
        nik: data.leaderNIK,
        nisn: data.leaderNISN,
        phone_number: data.leaderWhatsApp,
        student_card: uploads.leaderStudentCard,
        twibbon: uploads.leaderTwibbonProof,
        role: "LEADER",
      },
      member_identity: [
        {
          name: data.member1Name,
          email: data.member1Email,
          nik: data.member1NIK,
          nisn: data.member1NISN,
          phone_number: data.member1WhatsApp,
          student_card: uploads.member1StudentCard,
          twibbon: uploads.member1TwibbonProof,
          role: "MEMBER",
        },
        {
          name: data.member2Name,
          email: data.member2Email,
          nik: data.member2NIK,
          nisn: data.member2NISN,
          phone_number: data.member2WhatsApp,
          student_card: uploads.member2StudentCard,
          twibbon: uploads.member2TwibbonProof,
          role: "MEMBER",
        },
      ],
      teacher_identity: {
        name: data.teacherName,
        email: data.teacherEmail,
        phone_number: data.teacherWhatsApp,
      },
    },
    payment_data: {
      amount: data.amount,
      sender_bank_name: data.bankName,
      sender_name: data.senderName,
      date_of_transfer: data.dateOfTransfer.toISOString(),
      proof: uploads.proofOfTransfer,
      bank_id: data.bankId,
    },
  };
}
