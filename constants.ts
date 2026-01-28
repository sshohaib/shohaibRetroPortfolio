import { Job, Education, Skill, Certification } from './types';

export const PERSONAL_INFO = {
  name: "Engr. Md Shohaib Islam",
  title: "Data Analyst @ WSD..| IEB Member: A-26074",
  location: "Dhaka, 1212, Bangladesh",
  phone: "+8801303-142366",
  whatsapp: "https://wa.me/+8801303142366",
  email: "shohaib.is@gmail.com",
  linkedin: "https://www.linkedin.com/in/shohaibSinjon",
  github: "https://github.com/sshohaib",
  summary: "Fulltime Data Analyst with background in Software Engineering & Consultancy having expertise in US SEC Compliances, Power BI (MS certified associate), CISCO networking, and network security. Skilled in Financial Data Analysis, Product Management, and converting complex data into actionable insights."
};

export const EXPERIENCE: Job[] = [
  {
    id: "wsd-analyst",
    company: "WSD - Compliance Services LTD",
    role: "Data Analyst",
    period: "09/2025 - Current",
    location: "Dhaka, Bangladesh (Hybrid)",
    details: [
      "Financial Products Analysis & Financial Data Management.",
      "Structured Product (SPi) Compliance Expert for US & APAC Market.",
      "Upheld strict data security standards for financial information."
    ]
  },
  {
    id: "wsd-filing",
    company: "WSD - Compliance Services LTD",
    role: "Filing Specialist",
    period: "01/2023 - 08/2025",
    location: "Dhaka, Bangladesh (Remote)",
    details: [
      "Converted Word/PDF to HTML according to SEC requirements.",
      "Executed filing processes in US SEC portal maintaining strict compliance.",
      "Ensured quality assurance standards in project documentation."
    ]
  },
  {
    id: "asia-japan",
    company: "Asia Japan Real Estate LTD",
    role: "Software Engineering & Consultation Intern",
    period: "05/2023 - 08/2023",
    location: "Dhaka, Bangladesh",
    details: [
      "Sister concern of Asia Group Japan; Facilitated investments for Japanese individuals.",
      "Created and managed digital content for the real estate sector.",
      "Delivered an in-house tech product for streamlined processes."
    ]
  },
  {
    id: "bjet",
    company: "BJET (University of Miyazaki, Japan | BJIT)",
    role: "Trainee Software Engineer",
    period: "06/2022 - 03/2023",
    location: "Dhaka, Bangladesh",
    details: [
      "Intensive software engineer hiring program for the Japanese IT market.",
      "Learned Japanese Language, Business Manners, and Software Management Tools."
    ]
  }
];

export const EDUCATION: Education[] = [
  {
    school: "North South University",
    degree: "BSc in Computer Science & Engineering",
    period: "2016-2022",
    location: "Dhaka, Bangladesh"
  }
];

export const SKILLS: Skill[] = [
  { name: "Power BI", level: 90, category: 'Data' },
  { name: "MS Excel", level: 95, category: 'Data' },
  { name: "Financial Analysis", level: 85, category: 'Data' },
  { name: "SEC Compliance", level: 88, category: 'Data' },
  { name: "SQL / MySQL", level: 80, category: 'Dev' },
  { name: "Python", level: 75, category: 'Dev' },
  { name: "ReactJS", level: 70, category: 'Dev' },
  { name: "Cisco Networking", level: 85, category: 'Network' },
  { name: "Network Security", level: 80, category: 'Network' },
];

export const CERTIFICATIONS: Certification[] = [
  { name: "Power BI Data Analyst Associate", issuer: "Microsoft", date: "Sep 2025 - Sep 2026" },
  { name: "CISCO Verified (Networking/Security)", issuer: "NACTAR BD", date: "Oct 2024" }
];