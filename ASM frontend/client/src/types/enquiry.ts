// ASM CSIT reference recreation: a minimal, respectful admission enquiry flow with no hidden data handling.
export type EnquiryFormData = {
  fullName: string;
  mobile: string;
  interestedCourse: string;
  enquiryType: string;
  question: string;
  email?: string;
  city?: string;
  whatsappConsent?: boolean;
};

export type EnquiryResponse = {
  status: "submitted" | "notConnected" | "error";
  enquiryId?: string;
  message: string;
};


