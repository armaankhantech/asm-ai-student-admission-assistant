// ASM CSIT reference recreation: this is the only future enquiry integration seam; no storage or network calls in V1.
import type { EnquiryFormData, EnquiryResponse } from "@/types/enquiry";

export const enquiryService = {
  async submitEnquiry(_data: EnquiryFormData): Promise<EnquiryResponse> {
    await new Promise((resolve) => window.setTimeout(resolve, 700));
    return {
      status: "notConnected",
      message: "Demo mode: your form is valid, but submission is not connected yet.",
    };
  },
};


