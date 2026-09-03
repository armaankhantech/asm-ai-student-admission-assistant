// ASM CSIT reference recreation: minimal, accessible, honest enquiry form using the official site palette and future service boundary.
import { Loader2, Send } from "lucide-react";
import { useMemo, useState } from "react";
import { enquiryTypes, programs } from "@/data/collegeData";
import { enquiryService } from "@/services/enquiryService";
import type { EnquiryFormData, EnquiryResponse } from "@/types/enquiry";
import { EnquiryStatus } from "./EnquiryStatus";

type FieldErrors = Partial<Record<keyof EnquiryFormData, string>>;

const initialValues: EnquiryFormData = {
  fullName: "",
  mobile: "",
  interestedCourse: "",
  enquiryType: "",
  question: "",
  email: "",
  city: "",
  whatsappConsent: false,
};

function validate(values: EnquiryFormData): FieldErrors {
  const errors: FieldErrors = {};

  if (values.fullName.trim().length < 2) {
    errors.fullName = "Enter your full name.";
  }

  if (!/^[0-9+\s()-]{8,18}$/.test(values.mobile.trim())) {
    errors.mobile = "Enter a valid mobile or WhatsApp number.";
  }

  if (!values.interestedCourse) {
    errors.interestedCourse = "Select the course you are interested in.";
  }

  if (!values.enquiryType) {
    errors.enquiryType = "Select an enquiry type.";
  }

  if (values.question.trim().length < 10) {
    errors.question = "Please add a little more detail to your question.";
  }

  // Email is now REQUIRED because the enquiry confirmation
  // will be sent to the student's email address.
  if (!values.email.trim()) {
    errors.email = "Enter your email address.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }

  return errors;
}

function FieldError({ error }: { error?: string }) {
  return error ? (
    <p className="mt-1.5 text-xs font-semibold text-[#b43b2e]">
      {error}
    </p>
  ) : null;
}

export function EnquiryForm() {
  const [values, setValues] = useState<EnquiryFormData>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<EnquiryResponse | null>(null);

  const courseOptions = useMemo(
    () => programs.map((program) => program.title),
    []
  );

  const update = <K extends keyof EnquiryFormData>(
    field: K,
    value: EnquiryFormData[K]
  ) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setResult(null);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) return;

    setSubmitting(true);

    const response = await enquiryService.submitEnquiry(values);

    setSubmitting(false);
    setResult(response);
  };

  return (
    <>
      {result?.status === "submitted" ? (
        <div className="border border-[#e1e1e1] bg-white p-5 shadow-[0_5px_18px_rgba(0,0,0,.08)] sm:p-8">
          <div className="mb-5">
            <p className="font-heading text-[11px] font-semibold uppercase tracking-[.15em] text-[#0095eb]">
              Admission enquiry
            </p>

            <h2 className="font-heading mt-2 text-2xl font-semibold text-[#1c2d59]">
              Enquiry submitted
            </h2>
          </div>

          <EnquiryStatus
            status="submitted"
            message={result.message}
            onTryAgain={() => {
              setValues(initialValues);
              setErrors({});
              setResult(null);
            }}
          />
        </div>
      ) : (
        <form
          noValidate
          onSubmit={onSubmit}
          className="border border-[#e1e1e1] bg-white p-5 shadow-[0_5px_18px_rgba(0,0,0,.08)] sm:p-8"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-heading text-[11px] font-semibold uppercase tracking-[.15em] text-[#0095eb]">
                Admission enquiry
              </p>

              <h2 className="font-heading mt-2 text-2xl font-semibold text-[#1c2d59]">
                Submit your enquiry
              </h2>
            </div>

            <span className="bg-[#f2faf4] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.12em] text-[#3e8d34]">
              Online enquiry
            </span>
          </div>

          <p className="mt-3 text-sm leading-6 text-[#666]">
            Required fields are marked with{" "}
            <span aria-hidden="true">*</span>. Your enquiry will be submitted
            to the ASM CSIT admission system.
          </p>

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            {/* Full Name */}
            <label className="block sm:col-span-2">
              <span className="text-sm font-extrabold text-[#213554]">
                Full name <span className="text-[#159b67]">*</span>
              </span>

              <input
                value={values.fullName}
                onChange={(event) =>
                  update("fullName", event.target.value)
                }
                autoComplete="name"
                className={`mt-2 h-12 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:border-[#159b67] focus:ring-4 focus:ring-[#159b67]/10 ${
                  errors.fullName
                    ? "border-[#c54a3c]"
                    : "border-[#d6dce5]"
                }`}
                aria-invalid={Boolean(errors.fullName)}
              />

              <FieldError error={errors.fullName} />
            </label>

            {/* Mobile */}
            <label className="block">
              <span className="text-sm font-extrabold text-[#213554]">
                Mobile / WhatsApp number{" "}
                <span className="text-[#159b67]">*</span>
              </span>

              <input
                value={values.mobile}
                onChange={(event) =>
                  update("mobile", event.target.value)
                }
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={`mt-2 h-12 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:border-[#159b67] focus:ring-4 focus:ring-[#159b67]/10 ${
                  errors.mobile
                    ? "border-[#c54a3c]"
                    : "border-[#d6dce5]"
                }`}
                aria-invalid={Boolean(errors.mobile)}
              />

              <FieldError error={errors.mobile} />
            </label>

            {/* Interested Course */}
            <label className="block">
              <span className="text-sm font-extrabold text-[#213554]">
                Interested course{" "}
                <span className="text-[#159b67]">*</span>
              </span>

              <select
                value={values.interestedCourse}
                onChange={(event) =>
                  update("interestedCourse", event.target.value)
                }
                className={`mt-2 h-12 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:border-[#159b67] focus:ring-4 focus:ring-[#159b67]/10 ${
                  errors.interestedCourse
                    ? "border-[#c54a3c]"
                    : "border-[#d6dce5]"
                }`}
                aria-invalid={Boolean(errors.interestedCourse)}
              >
                <option value="">Select a course</option>

                {courseOptions.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>

              <FieldError error={errors.interestedCourse} />
            </label>

            {/* Enquiry Type */}
            <label className="block">
              <span className="text-sm font-extrabold text-[#213554]">
                Enquiry type{" "}
                <span className="text-[#159b67]">*</span>
              </span>

              <select
                value={values.enquiryType}
                onChange={(event) =>
                  update("enquiryType", event.target.value)
                }
                className={`mt-2 h-12 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:border-[#159b67] focus:ring-4 focus:ring-[#159b67]/10 ${
                  errors.enquiryType
                    ? "border-[#c54a3c]"
                    : "border-[#d6dce5]"
                }`}
                aria-invalid={Boolean(errors.enquiryType)}
              >
                <option value="">Select enquiry type</option>

                {enquiryTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              <FieldError error={errors.enquiryType} />
            </label>

            {/* Email - REQUIRED */}
            <label className="block">
              <span className="text-sm font-extrabold text-[#213554]">
                Email <span className="text-[#159b67]">*</span>
              </span>

              <input
                value={values.email}
                onChange={(event) =>
                  update("email", event.target.value)
                }
                type="email"
                autoComplete="email"
                placeholder="Enter your active email address"
                className={`mt-2 h-12 w-full rounded-xl border bg-white px-3.5 text-sm outline-none transition focus:border-[#159b67] focus:ring-4 focus:ring-[#159b67]/10 ${
                  errors.email
                    ? "border-[#c54a3c]"
                    : "border-[#d6dce5]"
                }`}
                aria-invalid={Boolean(errors.email)}
                aria-describedby="email-help"
              />

              <p
                id="email-help"
                className="mt-1.5 text-xs leading-5 text-[#7a8798]"
              >
                We’ll send your enquiry confirmation to this email address.
              </p>

              <FieldError error={errors.email} />
            </label>

            {/* City */}
            <label className="block sm:col-span-2">
              <span className="text-sm font-extrabold text-[#213554]">
                City{" "}
                <span className="font-medium text-[#7a8798]">
                  (optional)
                </span>
              </span>

              <input
                value={values.city}
                onChange={(event) =>
                  update("city", event.target.value)
                }
                autoComplete="address-level2"
                className="mt-2 h-12 w-full rounded-xl border border-[#d6dce5] bg-white px-3.5 text-sm outline-none transition focus:border-[#159b67] focus:ring-4 focus:ring-[#159b67]/10"
              />
            </label>

            {/* Question */}
            <label className="block sm:col-span-2">
              <span className="text-sm font-extrabold text-[#213554]">
                Enquiry / question{" "}
                <span className="text-[#159b67]">*</span>
              </span>

              <textarea
                value={values.question}
                onChange={(event) =>
                  update("question", event.target.value)
                }
                rows={5}
                maxLength={700}
                className={`mt-2 w-full resize-y rounded-xl border bg-white px-3.5 py-3 text-sm leading-6 outline-none transition focus:border-[#159b67] focus:ring-4 focus:ring-[#159b67]/10 ${
                  errors.question
                    ? "border-[#c54a3c]"
                    : "border-[#d6dce5]"
                }`}
                aria-invalid={Boolean(errors.question)}
              />

              <div className="flex justify-between gap-4">
                <FieldError error={errors.question} />

                <span className="mt-1.5 text-xs text-[#7a8798]">
                  {values.question.length}/700
                </span>
              </div>
            </label>
          </div>

          {/* WhatsApp Consent */}
          <label className="mt-6 flex items-start gap-3 rounded-xl bg-[#f5f8fb] p-3.5">
            <input
              checked={Boolean(values.whatsappConsent)}
              onChange={(event) =>
                update("whatsappConsent", event.target.checked)
              }
              type="checkbox"
              className="mt-0.5 h-4 w-4 rounded border-[#aab6c6] accent-[#159b67]"
            />

            <span className="text-xs leading-5 text-[#52657b]">
              I agree to receive admission-related communication on WhatsApp
              when the admission workflow is connected.
            </span>
          </label>

          {/* Submit */}
          <button
            disabled={submitting}
            type="submit"
            className="asm-green-cta mt-6 inline-flex min-h-[50px] w-full items-center justify-center gap-2 px-5 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-65"
          >
            {submitting ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                Submitting enquiry
              </>
            ) : (
              <>
                <Send size={17} />
                Submit enquiry
              </>
            )}
          </button>

          {/* Error Result */}
          {result?.status === "error" && (
            <EnquiryStatus
              status="error"
              message={result.message}
              onTryAgain={() => setResult(null)}
            />
          )}
        </form>
      )}
    </>
  );
}