export interface WorkExperience {
  id: number;
  company: string;
  roleEs: string;
  roleEn?: string;
  descriptionEs: string;
  descriptionEn?: string;
  periodEs: string;
  periodEn?: string;
  technologies: string;
  sortOrder?: number;
}
