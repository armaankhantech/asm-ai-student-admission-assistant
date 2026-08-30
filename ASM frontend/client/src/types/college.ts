// ASM CSIT reference recreation: keep content factual, centralized, and concise.
export type ProgramCategory = "Undergraduate" | "Postgraduate";

export type Program = {
  id: string;
  title: string;
  category: ProgramCategory;
  source: string;
};

export type Facility = {
  title: string;
  description: string;
  icon: "Monitor" | "BookOpen" | "Presentation" | "Trophy";
  source: string;
};

export type ContactInfo = {
  address: string;
  phone: string;
  email: string;
  source: string;
};


