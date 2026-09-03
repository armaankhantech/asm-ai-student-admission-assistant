// ASM CSIT enquiry integration.
// Sends enquiry data to the ASM AI backend.

import type { EnquiryFormData, EnquiryResponse } from "@/types/enquiry";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

export const enquiryService = {
  async submitEnquiry(data: EnquiryFormData): Promise<EnquiryResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/enquiries`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        return {
          status: "error",
          message:
            result?.message ||
            "We could not submit your enquiry. Please try again.",
        };
      }

      return {
        status: "submitted",
        enquiryId: result?.enquiry?.id,
        message:
          result?.message || "Enquiry submitted successfully.",
      };
    } catch (error) {
      console.error("Enquiry submission error:", error);

      return {
        status: "error",
        message:
          "Unable to connect to the ASM AI server. Please try again.",
      };
    }
  },
};