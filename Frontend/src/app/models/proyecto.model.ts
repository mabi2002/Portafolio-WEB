export interface Proyecto {
  id: number;
  titulo: string;
  descripcion: string;
  tecnologias: string;
  imagenUrl: string;
  urlGithub?: string;
  urlDemo?: string;
  fechaCreacion: Date;
}
