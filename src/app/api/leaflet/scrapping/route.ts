import * as cheerio from 'cheerio';

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { LeafletType } from '@/app/interfaces/leaflet';

import { DICTIONARIES } from '@/constants/dictionaries';
import { removeUnexpectedTitleWords, sanitizeAndFormatWord } from '@/utils/string';

export async function POST(req: NextRequest): Promise<NextResponse<LeafletType[]>> {
  const medicineName = ((await req.json())?.medicineName as string).toLowerCase();

  const sanitizedMedicineName = sanitizeAndFormatWord(medicineName);
  const { CONSULTA_REMEDIOS, DOR_MAIS_SAUDE } = DICTIONARIES;

  const [consultaRemediosRes, dorMaisSaudeRes] = await Promise.all([
    fetch(`${CONSULTA_REMEDIOS.url}/${sanitizedMedicineName}/${CONSULTA_REMEDIOS.leafletPath}`)
      .then((response) => response.text())
      .then((html) => cheerio.load(html)),

    fetch(`${DOR_MAIS_SAUDE.url}/${DOR_MAIS_SAUDE.leafletPath}/${sanitizedMedicineName}`)
      .then((response) => response.text())
      .then((html) => cheerio.load(html)),
  ]);

  const leaflets: LeafletType[] = [];

  const consultaRemediosResTitle = consultaRemediosRes(CONSULTA_REMEDIOS.titleSelector).text();

  if (consultaRemediosResTitle) {
    leaflets.push({
      title: removeUnexpectedTitleWords(consultaRemediosResTitle),
      activeSubstance: removeUnexpectedTitleWords(consultaRemediosRes(CONSULTA_REMEDIOS.activeSubstanceSelector).text()),
      therapeuticClass: removeUnexpectedTitleWords(consultaRemediosRes(CONSULTA_REMEDIOS.therapeuticClassSelector).text()),
      whatFor: consultaRemediosRes(CONSULTA_REMEDIOS.whatForSelector).text(),
      howItWorks: consultaRemediosRes(CONSULTA_REMEDIOS.howItWorksSelector).text(),
      siteName: CONSULTA_REMEDIOS.siteName,
    })
  }

  const dorMaisSaudeResTitle = dorMaisSaudeRes(DOR_MAIS_SAUDE.titleSelector).text();

  if (dorMaisSaudeResTitle) {
    leaflets.push({
      title: dorMaisSaudeResTitle,
      activeSubstance: dorMaisSaudeRes(DOR_MAIS_SAUDE.activeSubstanceSelector).text(),
      therapeuticClass: dorMaisSaudeRes(DOR_MAIS_SAUDE.therapeuticClassSelector).text(),
      whatFor: dorMaisSaudeRes(DOR_MAIS_SAUDE.whatForSelector).text(),
      howItWorks: dorMaisSaudeRes(DOR_MAIS_SAUDE.howItWorksSelector).text(),
      siteName: DOR_MAIS_SAUDE.siteName,
    })
  }

  return NextResponse.json(leaflets);
}