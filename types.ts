export interface Job {
  id: string;
  company: string;
  role: string;
  period: string;
  location: string;
  details: string[];
}

export interface Education {
  school: string;
  degree: string;
  period: string;
  location: string;
}

export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'Data' | 'Dev' | 'Network' | 'Soft';
}

export interface Certification {
  name: string;
  issuer: string;
  date: string;
}

export interface NavItem {
  label: string;
  path: string;
}