export type UDSRCFormData = {
  teamName: string;
  university: string;
  nationality: string;
  subCompetition: string;
  statementLetter: File;

  leaderName: string;
  leaderEmail: string;
  leaderNIK: string | null;
  leaderNIM: string | null;
  leaderWhatsApp: string;
  leaderStudentCard: File;
  leaderTwibbonProof: File;

  member1Name: string;
  member1Email: string;
  member1NIK: string | null;
  member1NIM: string | null;
  member1WhatsApp: string;
  member1StudentCard: File;
  member1TwibbonProof: File;

  member2Name: string;
  member2Email: string;
  member2NIK: string | null;
  member2NIM: string | null;
  member2WhatsApp: string;
  member2StudentCard: File;
  member2TwibbonProof: File;

  amount: number;
  bankId: number;
  proofOfTransfer: File;
  bankName: string;
  senderName: string;
  dateOfTransfer: Date;
};

export type OKGDFormData = {
  teamName: string;
  schoolName: string;
  schoolAddress: string;
  integrityPact: File;

  leaderName: string;
  leaderEmail: string;
  leaderNIK: string;
  leaderNISN: string;
  leaderWhatsApp: string;
  leaderStudentCard: File;
  leaderTwibbonProof: File;

  member1Name: string;
  member1Email: string;
  member1NIK: string;
  member1NISN: string;
  member1WhatsApp: string;
  member1StudentCard: File;
  member1TwibbonProof: File;

  member2Name: string;
  member2Email: string;
  member2NIK: string;
  member2NISN: string;
  member2WhatsApp: string;
  member2StudentCard: File;
  member2TwibbonProof: File;

  teacherName: string;
  teacherEmail: string;
  teacherWhatsApp: string;
  teacherAgreement: boolean;

  amount: number;
  bankId: number;
  proofOfTransfer: File;
  bankName: string;
  senderName: string;
  dateOfTransfer: Date;
};
