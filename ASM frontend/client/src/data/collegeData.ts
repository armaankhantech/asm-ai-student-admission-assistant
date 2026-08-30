// ASM CSIT reference recreation: use verified college content only and retain source references.
import type { ContactInfo, Facility, Program } from "@/types/college";

export const officialSources = {
  home: "https://www.csit.edu.in/",
  courses: "https://www.csit.edu.in/courses",
  infrastructure: "https://www.csit.edu.in/infrastructure",
  placements: "https://www.csit.edu.in/placements",
  contact: "https://www.csit.edu.in/contact",
};

export const navItems = [
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Campus", href: "#campus" },
  { label: "Career Support", href: "#placements" },
  { label: "Contact", href: "#contact" },
];

export const programs: Program[] = [
  { id: "bba", title: "BBA", category: "Undergraduate", source: officialSources.courses },
  { id: "bba-ib", title: "BBA (IB)", category: "Undergraduate", source: officialSources.courses },
  { id: "bba-ca", title: "BBA (CA)", category: "Undergraduate", source: officialSources.courses },
  { id: "bca", title: "BCA", category: "Undergraduate", source: officialSources.courses },
  { id: "bsc-cs", title: "B.Sc Computer Science", category: "Undergraduate", source: officialSources.courses },
  { id: "bsc-it", title: "B.Sc IT", category: "Undergraduate", source: officialSources.courses },
  { id: "bsc-ai", title: "B.Sc AI & ML", category: "Undergraduate", source: officialSources.courses },
  { id: "bsc-cyber", title: "B.Sc Cyber Security", category: "Undergraduate", source: officialSources.courses },
  { id: "bsc-animation", title: "B.Sc Animation", category: "Undergraduate", source: officialSources.courses },
  { id: "bcom", title: "B.Com", category: "Undergraduate", source: officialSources.courses },
  { id: "bcom-im", title: "B.Com Integrated Marketing", category: "Undergraduate", source: officialSources.courses },
  { id: "msc-cs", title: "M.Sc Computer Science", category: "Postgraduate", source: officialSources.courses },
  { id: "msc-ds", title: "M.Sc Data Science", category: "Postgraduate", source: officialSources.courses },
  { id: "msc-ca", title: "M.Sc Computer Applications", category: "Postgraduate", source: officialSources.courses },
];

export const facilities: Facility[] = [
  {
    title: "Computer labs",
    description: "Technology-enabled learning spaces referenced by the official infrastructure pages.",
    icon: "Monitor",
    source: officialSources.infrastructure,
  },
  {
    title: "Library resources",
    description: "Dedicated study and reference resources supporting academic work.",
    icon: "BookOpen",
    source: officialSources.infrastructure,
  },
  {
    title: "Seminar spaces",
    description: "Collaborative spaces for talks, academic exchange, and student activity.",
    icon: "Presentation",
    source: officialSources.infrastructure,
  },
  {
    title: "Sports facilities",
    description: "Campus facilities that support activity beyond the classroom.",
    icon: "Trophy",
    source: officialSources.infrastructure,
  },
];

export const contactInfo: ContactInfo = {
  address: "Old Mumbai–Pune Highway, Pimpri, Pune – 411018",
  phone: "+91 20 6635 1700",
  email: "csit@asmedu.org",
  source: officialSources.contact,
};

export const quickActions = [
  { label: "Courses", prompt: "What courses are available at ASM CSIT?", icon: "GraduationCap" },
  { label: "Admissions", prompt: "What is the admission process at ASM CSIT?", icon: "FileText" },
  { label: "Eligibility", prompt: "What are the eligibility requirements?", icon: "BadgeCheck" },
  { label: "Documents", prompt: "What documents are required for admission?", icon: "FolderOpen" },
  { label: "Fees", prompt: "Where can I find fee information?", icon: "WalletCards" },
  { label: "Contact Admission", prompt: "How can I contact the admission department?", icon: "PhoneCall" },
  { label: "About ASM CSIT", prompt: "Tell me about ASM CSIT.", icon: "Landmark" },
] as const;

export const popularQuestions = [
  "What courses are available?",
  "What is the admission process?",
  "What are the eligibility requirements?",
  "What documents are required?",
  "What are the fees?",
  "What is the campus like?",
  "How can I contact the admission department?",
];

export const enquiryTypes = [
  "Course information",
  "Admission process",
  "Eligibility",
  "Fees",
  "Documents",
  "Campus",
  "Other",
];


