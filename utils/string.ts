const SPACE_STRING = " ";

function sanitizeAndFormatWord(word: string) {
  return word
    .replaceAll(SPACE_STRING, "-") // Replace spaces with hyphens
    .normalize("NFD") // Normalize to decomposed Unicode
    .replace(/[\u0300-\u036f]/g, ""); // Remove diacritical marks
}

export {
  sanitizeAndFormatWord,
}
