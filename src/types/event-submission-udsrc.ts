export type UDSRCSubmissionRequest = {
  abstract: null | string;
  validation_sheet: null | string;
  poster: null | string;
  description: null | string;
};

export type UDSRCSubmissionResponse = {
  participant_id: string;
  poster: null | string;
  description: null | string;
  abstract: null | string;
  validation_sheet: null | string;
};
