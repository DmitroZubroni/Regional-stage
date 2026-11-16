/**
 * typograph.js — Russian typographic rules according to studio methodology (Rule Т10)
 *
 * Fix (design audit, 2026-11-17): the previous implementation packed a list of
 * short prepositions/conjunctions into a single regex CHARACTER CLASS
 * (`[ввооиусккя...]+`), which does not match whole words at all — it matches
 * runs of individual letters, and the embedded "из-под" accidentally created
 * an unintended Unicode range (`з-п`) inside the class. The rule never fired
 * correctly. This rewrite matches real whole words on word boundaries.
 */

// Short one- and two-letter Russian prepositions/conjunctions that must never
// be left alone at the end of a line (Rule Т10).
const SHORT_WORDS = [
  "в", "к", "с", "у", "о", "а", "и", "я",
  "не", "ни", "же", "но", "да", "ли", "бы", "то", "ну",
  "на", "по", "до", "от", "из", "об", "во", "со", "ко",
  "под", "над", "для", "при", "про", "без", "как", "что", "чем", "или",
  "из-за", "из-под",
];

const UNIQUE_WORDS = Array.from(new Set(SHORT_WORDS)).sort((a, b) => b.length - a.length);
const PREPOSITION_RE = new RegExp(
  `(^|[\\s(«"„'])(${UNIQUE_WORDS.join("|")})(\\s+)(?=\\S)`,
  "gi"
);

export function typograph(text) {
  if (!text || typeof text !== "string") return text || "";

  return text
    // 1. Неразрывный пробел после коротких предлогов и союзов
    .replace(PREPOSITION_RE, (_match, before, word) => `${before}${word}\u{A0}`)
    // 2. Длинное тире с неразрывным пробелом перед ним
    .replace(/\s+[-—–]\s+/g, "\u{A0}— ")
    // 3. Неразрывный пробел между числом и следующим словом/знаком (%, px, баллов…)
    .replace(/(\d+)\s+(?=[а-яА-ЯёЁa-zA-Z%])/g, "$1\u{A0}")
    .trim();
}
