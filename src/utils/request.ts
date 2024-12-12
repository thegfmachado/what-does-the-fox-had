const getDictionaries = (searchWord: string) => ({
  CONSULTA_REMEDIOS: {
    url: "https://consultaremedios.com.br",
    leafletPath: `${searchWord}/bula`,
    titlePath: '#cr_app > main > div:nth-child(3) > div > h1',
    activeSubstancePath: '#cr_app > main > div:nth-child(3) > div.px-3 > p:nth-child(1)',
    therapeuticClassPath: '#cr_app > main > div:nth-child(3) > div.px-3 > p:nth-child(2)',
    whatForPath: '#para-que-serve > div.dinamic-html',
    howItWorksPath: '#como-funciona > div.dinamic-html',
    source: "Consulta Remédios",
  },
  DOR_MAIS_SAUDE: {
    url: "https://www.dormaissaude.com.br",
    leafletPath: `bulario/${searchWord}`,
    titlePath: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(1) > h1',
    activeSubstancePath: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(1) > p:nth-child(2) > span',
    therapeuticClassPath: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(1) > p:nth-child(3) > span',
    whatForPath: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(2) > div',
    howItWorksPath: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(8) > div',
    source: "D'or Mais Saúde",
  },
});

function getHeaders(originURL: string) {
  return {
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
    "Referer": originURL,
    "Referrer-Policy": "no-referrer-when-downgrade"
  };
}

export {
  getDictionaries,
  getHeaders,
};
