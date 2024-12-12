import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import * as cheerio from 'cheerio';

import { LeafletType } from '@/app/interfaces/leaflet';
import { getDictionaries } from '@/utils/request';
import { sanitizeAndFormatWord } from '@/utils/string';

export async function POST(req: NextRequest): Promise<NextResponse<LeafletType[]>> {
  const word = ((await req.json())?.word as string).toLowerCase();

  const sanitizedWord = sanitizeAndFormatWord(word);
  const { CONSULTA_REMEDIOS, DOR_MAIS_SAUDE } = getDictionaries(sanitizedWord);

  const [resp1, resp2] = await Promise.all([
    fetch(`${CONSULTA_REMEDIOS.url}/${CONSULTA_REMEDIOS.leafletPath}`)
      .then((response) => response.text())
      .then((html) => cheerio.load(html)),

    fetch(`${DOR_MAIS_SAUDE.url}/${DOR_MAIS_SAUDE.leafletPath}`)
      .then((response) => response.text())
      .then((html) => cheerio.load(html)),
  ]);

  const leaflets: LeafletType[] = [
    {
      title: resp1(CONSULTA_REMEDIOS.titlePath).text(),
      activeSubstance: resp1(CONSULTA_REMEDIOS.activeSubstancePath).text(),
      therapeuticClass: resp1(CONSULTA_REMEDIOS.therapeuticClassPath).text(),
      whatFor: resp1(CONSULTA_REMEDIOS.whatForPath).text(),
      howItWorks: resp1(CONSULTA_REMEDIOS.howItWorksPath).text(),
      source: CONSULTA_REMEDIOS.source,
    },
    {
      title: resp2(DOR_MAIS_SAUDE.titlePath).text(),
      activeSubstance: resp2(DOR_MAIS_SAUDE.activeSubstancePath).text(),
      therapeuticClass: resp2(DOR_MAIS_SAUDE.therapeuticClassPath).text(),
      whatFor: resp2(DOR_MAIS_SAUDE.whatForPath).text(),
      howItWorks: resp2(DOR_MAIS_SAUDE.howItWorksPath).text(),
      source: DOR_MAIS_SAUDE.source,
    }
  ];

  return NextResponse.json(leaflets);
}