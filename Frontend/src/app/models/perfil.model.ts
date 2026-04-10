export interface Perfil {
  id: number;
  nombre: string;
  titulo: string;
  bio: string;
  email: string;
  telefono?: string;
  cvUrl?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  fotoUrl?: string;
  experiencia?: string;
  educacion?: string;
}
