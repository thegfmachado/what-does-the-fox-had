import { LeafletType } from '@/app/interfaces/leaflet';
import { getDictionaries } from '@/utils/request';
import { sanitizeAndFormatWord } from '@/utils/string';
import * as cheerio from 'cheerio';

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// import { getHeaders } from '@/utils/request';
// const headers = getHeaders("https://consultaremedios.com.br/");

export async function POST(req: NextRequest): Promise<NextResponse<LeafletType>> {
  const word = ((await req.json())?.word as string).toLowerCase();

  const sanitizedWord = sanitizeAndFormatWord(word);
  const { CONSULTA_REMEDIOS } = getDictionaries(sanitizedWord);

  const request = await fetch(`${CONSULTA_REMEDIOS.url}/${CONSULTA_REMEDIOS.leafletPath}`);

  const response = await request.text();
  const leafletResponse = cheerio.load(response);

  const title = leafletResponse(CONSULTA_REMEDIOS.titlePath).text();
  const activeSubstance = leafletResponse(CONSULTA_REMEDIOS.activeSubstancePath).text();
  const therapeuticClass = leafletResponse(CONSULTA_REMEDIOS.therapeuticClassPath).text();
  const whatFor = leafletResponse(CONSULTA_REMEDIOS.whatForPath).text();
  const howItWorks = leafletResponse(CONSULTA_REMEDIOS.howItWorksPath).text();

  return NextResponse.json({ activeSubstance, therapeuticClass, title, whatFor, howItWorks });
}