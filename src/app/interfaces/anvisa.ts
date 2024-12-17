import { LeafletType } from "./leaflet";

interface ANVISAMedicineReferenceType {
  idBulaPacienteProtegido: string;
  numProcesso: string;
}

interface ANVISAMedicineType {
  classeTerapeutica: string;
  classesTerapeuticas: string[];
  nomeComercial: string;
  principioAtivo: string;
  razaoSocial: string;
  pdfURL: string;
}

interface ANVISALeafletType extends Pick<LeafletType, 'activeSubstance' | 'title' | 'therapeuticClass' | 'siteName'> {
  pdfURL: string;
}

export type { ANVISAMedicineReferenceType, ANVISAMedicineType, ANVISALeafletType };