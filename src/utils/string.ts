const SPACE_STRING = " ";

function normalize(word: string): string {
  return word
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

export function sanitizeAndFormatWord(word: string): string {
  return normalize(word
    .replaceAll(SPACE_STRING, "-"));
}

export function removeUnexpectedTitleWords(input: string): string {
  const pattern = new RegExp(`\\b(${['Bula do', 'Princípio', 'Ativo', 'Classe', 'Terapêutica'].join('|')})\\b`, 'gi');
  return input.replace(pattern, '').replace(/\s+/g, ' ').replace(':', '').trim();
}