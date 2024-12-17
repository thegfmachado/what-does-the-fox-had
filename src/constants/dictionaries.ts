export const DICTIONARIES = {
  CONSULTA_REMEDIOS: {
    url: "https://consultaremedios.com.br",
    leafletPath: `bula`,
    titleSelector: '#cr_app > main > div:nth-child(3) > div > h1',
    activeSubstanceSelector: '#cr_app > main > div:nth-child(3) > div.px-3 > p:nth-child(1)',
    therapeuticClassSelector: '#cr_app > main > div:nth-child(3) > div.px-3 > p:nth-child(2)',
    whatForSelector: '#para-que-serve > div.dinamic-html',
    howItWorksSelector: '#como-funciona > div.dinamic-html',
    siteName: "Consulta Remédios",
  },
  DOR_MAIS_SAUDE: {
    url: "https://www.dormaissaude.com.br",
    leafletPath: `bulario`,
    titleSelector: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(1) > h1',
    activeSubstanceSelector: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(1) > p:nth-child(2) > span',
    therapeuticClassSelector: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(1) > p:nth-child(3) > span',
    whatForSelector: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(2) > div',
    howItWorksSelector: 'body > div.render-container.render-route-store-custom-bulario-product > div > div.vtex-store__template.bg-base > div > div:nth-child(6) > div > div:nth-child(5) > div > section > div > div > div > div > div > div.rededor-bulario-0-x-productPageRightCol.w-100.w-75-l.flex.flex-column.items-start.justify-start > div:nth-child(8) > div',
    siteName: "D'or Mais Saúde",
  },
};