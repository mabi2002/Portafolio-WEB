export interface Proyecto {
  id: number;
  titulo: string;
  tituloEn?: string;
  descripcion: string;
  descripcionEn?: string;
  tecnologias: string;
  imagenUrl: string;
  urlGithub?: string;
  urlDemo?: string;
  fechaCreacion: Date;
}
