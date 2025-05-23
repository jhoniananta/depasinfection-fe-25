export const UDSRCsteps = [
  { label: "Team Information", value: 0 },
  { label: "Leader Information", value: 25 },
  { label: "Members Information", value: 50 },
  { label: "Payment", value: 75 },
  { label: "Completed", value: 100 },
];

export const LeaderUDSRCtextFields = [
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
    name: "leaderNIM",
    label: "NIM",
    placeholder: "Enter your leader NIM",
    type: "number",
  },
];

export const LeaderUDSRCfileFields = [
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
