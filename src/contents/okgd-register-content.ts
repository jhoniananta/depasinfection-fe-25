export const OKGDsteps = [
  { label: "Team Information", value: 0 },
  { label: "Leader Information", value: 20 },
  { label: "Members Information", value: 40 },
  { label: "Accompanying Teacher", value: 60 },
  { label: "Payment", value: 80 },
  { label: "Complete", value: 100 },
];

export const LeaderOKGDtextFields = [
  {
    name: "leaderName",
    label: "Name",
    placeholder: "Enter your leader name",
    type: "text",
  },
  {
    name: "leaderEmail",
    label: "Email",
    placeholder: "Enter your leader email",
    type: "email",
  },
  {
    name: "leaderNIK",
    label: "NIK",
    placeholder: "Enter your leader NIK",
    type: "number",
  },
  {
    name: "leaderNISN",
    label: "NISN",
    placeholder: "Enter your leader NISN",
    type: "number",
  },
];

export const TeacherOKGDtextFields = [
  {
    name: "teacherName",
    label: "Name",
    placeholder: "Enter your teacher name",
    type: "text",
  },
  {
    name: "teacherEmail",
    label: "Email",
    placeholder: "Enter your teacher email",
    type: "email",
  },
];

export const LeaderOKGDfileFields = [
  {
    name: "leaderStudentCard",
    label: "Student Card",
    placeholder: "Upload your leader student card",
    accept: "application/pdf",
  },
  {
    name: "leaderTwibbonProof",
    label: "Proof of Twibbon Posting",
    placeholder: "Upload your leader twibbon proof",
    accept: "application/pdf",
  },
];
