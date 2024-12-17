import { ANVISALeafletType } from "@/app/interfaces/anvisa";
import { getMedicine, getPdfURL, queryByName } from "@/services/api/anvisa";
import { sanitizeAndFormatWord } from "@/utils/string";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function GET(req: NextRequest): Promise<NextResponse<ANVISALeafletType>> {
  const { searchParams } = new URL(req.url);

  const word = String(searchParams.get('medicine'));
  const sanitizedWord = sanitizeAndFormatWord(word);

  if (!sanitizedWord) {
    throw new Error("No name provided in query parameter");
  }

  try {
    const medicinesReferences = await queryByName(sanitizedWord);

    if (!medicinesReferences || !medicinesReferences.length) {
      throw new Error(`No medicines found for the name: ${sanitizedWord}`);
    }

    const medicineReference = medicinesReferences[0];

    const [medicine, pdfURL] = await Promise.all([
      getMedicine(medicineReference.numProcesso),
      getPdfURL(medicineReference.idBulaPacienteProtegido),
    ]);

    return NextResponse.json({
      activeSubstance: medicine.principioAtivo,
      title: medicine.nomeComercial,
      therapeuticClass: medicine.classeTerapeutica ?? medicine.classesTerapeuticas.join(', ') ?? '',
      siteName: 'ANVISA',
      pdfURL,
    });

  } catch (error) {
    throw new Error(`Error in ANVISA API handler. Details: ${error}`);
  }
}