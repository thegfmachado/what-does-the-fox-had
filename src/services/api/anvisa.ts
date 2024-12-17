import { ANVISAMedicineReferenceType, ANVISAMedicineType } from "@/app/interfaces/anvisa";
import { randomUseragent } from "@/utils/https";

const headers = {
  "accept": "application/json, text/plain, */*",
  "accept-language": "pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7",
  "authorization": "Guest",
  "cache-control": "no-cache",
  "if-modified-since": "Mon, 26 Jul 1997 05:00:00 GMT",
  "pragma": "no-cache",
  "sec-ch-ua-mobile": "?0",
  "sec-ch-ua-platform": "\"Windows\"",
  "sec-fetch-dest": "empty",
  "sec-fetch-mode": "cors",
  "sec-fetch-site": "same-origin",
  "cookie": "FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; _pk_id.42.210e=8eca716434ce3237.1690380888.; FGTServer=77E1DC77AE2F953D7ED796A08A630A01A53CF6FE5FD0E106412591871F9A9BBCFBDEA0AD564FD89D3BDE8278200B; _cfuvid=L.SzxLLxZoWYrYqhaiRgS5MTkV77mwE5uIyLNWvyufk-1690462598410-0-604800000; _pk_ref.42.210e=%5B%22%22%2C%22%22%2C1690462669%2C%22https%3A%2F%2Fwww.google.com%2F%22%5D; _pk_ses.42.210e=1; cf_clearance=tk5QcLSYPlUQfr8s2bTGXyvC2KZdHcEIYU8r6HCgNvQ-1690462689-0-160.0.0",
  "Referer": "https://consultas.anvisa.gov.br/",
  "UserAgent": randomUseragent(),
  "Referrer-Policy": "no-referrer-when-downgrade"
};

export async function getPdfURL(protectedLeafletId: string): Promise<string> {
  return `https://consultas.anvisa.gov.br/api/consulta/medicamentos/arquivo/bula/parecer/${protectedLeafletId}/?Authorization=`;
}

export async function getMedicine(processNumber: string): Promise<ANVISAMedicineType> {
  const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/medicamento/produtos/${processNumber}`, {
    headers,
  });

  return await response.json();
}

export async function queryByName(name: string): Promise<ANVISAMedicineReferenceType[]> {
  const response = await fetch(`https://consultas.anvisa.gov.br/api/consulta/bulario?count=1&filter%5BnomeProduto%5D=${name}&page=1`, {
    headers,
  });

  const { content } = await response.json();

  return content;
}