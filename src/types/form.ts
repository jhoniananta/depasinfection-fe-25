export type UDSRCFormData = {
  teamName: string;
  university: string;
  nationality: string;
  subCompetition: string;
  statementLetter: File;

  leaderName: string;
  leaderEmail: string;
  leaderNIK: string;
  leaderNIM: string;
  leaderWhatsApp: string;
  leaderStudentCard: File;
  leaderTwibbonProof: File;

  member1Name: string;
  member1Email: string;
  member1NIK: string;
  member1NIM: string;
  member1WhatsApp: string;
  member1StudentCard: File;
  member1TwibbonProof: File;

  member2Name: string;
  member2Email: string;
  member2NIK: string;
  member2NIM: string;
  member2WhatsApp: string;
  member2StudentCard: File;
  member2TwibbonProof: File;

  member3Name: string;
  member3Email: string;
  member3NIK: string;
  member3NIM: string;
  member3WhatsApp: string;
  member3StudentCard: File;
  member3TwibbonProof: File;

  proofOfTransfer: File;
  bankName: string;
  senderEmail: string;
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

  proofOfTransfer: File;
  bankName: string;
  senderEmail: string;
  dateOfTransfer: Date;
};
