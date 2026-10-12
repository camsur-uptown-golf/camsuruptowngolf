export type SiteSearchItem = {
  label: string;
  href: string;
  category: string;
  keywords?: readonly string[];
};

const TOKEN_ALIASES: Readonly<Record<string, string>> = {
  accommodations: "accommodation",
  bays: "bay",
  celebrations: "celebration",
  events: "event",
  experiences: "experience",
  holes: "hole",
  members: "member",
  no: "number",
  packages: "package",
  questions: "question",
  tournaments: "tournament",
};

const QUESTION_WORDS = new Set([
  "a",
  "about",
  "an",
  "are",
  "can",
  "do",
  "does",
  "how",
  "i",
  "is",
  "many",
  "me",
  "please",
  "the",
  "what",
  "where",
  "which",
]);

function rawSearchTokens(value: string) {
  const normalized = value
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/&/g, " and ")
    .replace(/[’'`]/g, "")
    .toLocaleLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, " ")
    .trim();

  if (!normalized) return [];

  return normalized.split(/\s+/).map((token) =>
    /^\d+$/.test(token) ? String(Number(token)) : token
  );
}

function searchTokens(value: string) {
  return rawSearchTokens(value).map((token) => TOKEN_ALIASES[token] ?? token);
}

function searchTokenVariants(value: string) {
  return [...new Set(rawSearchTokens(value).flatMap((token) => [
    TOKEN_ALIASES[token] ?? token,
    token,
  ]))];
}

export function normalizeSearchText(value: string) {
  return searchTokens(value).join(" ");
}

function meaningfulQueryTokens(value: string) {
  const tokens = searchTokens(value);
  const meaningful = tokens.filter((token) => !QUESTION_WORDS.has(token));
  return meaningful.length ? meaningful : tokens;
}

function editDistance(left: string, right: string) {
  const previous = Array.from({ length: right.length + 1 }, (_, index) => index);

  for (let leftIndex = 1; leftIndex <= left.length; leftIndex += 1) {
    const current = [leftIndex];

    for (let rightIndex = 1; rightIndex <= right.length; rightIndex += 1) {
      const substitutionCost = left[leftIndex - 1] === right[rightIndex - 1] ? 0 : 1;
      current[rightIndex] = Math.min(
        current[rightIndex - 1] + 1,
        previous[rightIndex] + 1,
        previous[rightIndex - 1] + substitutionCost,
      );
    }

    previous.splice(0, previous.length, ...current);
  }

  return previous[right.length];
}

function tokenMatchQuality(queryToken: string, candidateToken: string, exactOnly = false) {
  if (queryToken === candidateToken) return 3;

  // Numeric tokens stay exact so hole 1 cannot match 10. Text tokens support
  // type-ahead from their first character unless that completed token already
  // exists in a label or category (for example, "par" must not match "park").
  if (exactOnly || /^\d+$/.test(queryToken)) return 0;
  if (candidateToken.startsWith(queryToken)) return 2;

  // Typo tolerance starts at four characters to avoid noisy one- and two-letter
  // suggestions. Longer terms allow two edits; shorter terms allow one.
  if (queryToken.length < 4 || candidateToken.length < 4) return 0;
  const maximumDistance = queryToken.length >= 6 ? 2 : 1;
  return editDistance(queryToken, candidateToken) <= maximumDistance ? 1 : 0;
}

function itemSearchTokens(item: SiteSearchItem) {
  return [
    ...searchTokenVariants(item.label),
    ...searchTokenVariants(item.category),
    ...(item.keywords ?? []).flatMap(searchTokenVariants),
  ];
}

function scoreSearchItem(
  item: SiteSearchItem,
  query: string,
  queryTokens: string[],
  exactQueryTokens: Set<string>,
) {
  const normalizedQuery = normalizeSearchText(query);
  if (!normalizedQuery || !queryTokens.length) return null;

  const label = normalizeSearchText(item.label);
  const keywords = (item.keywords ?? []).map(normalizeSearchText).filter(Boolean);
  const meaningfulPhrase = queryTokens.join(" ");

  if (label === normalizedQuery) return 1_000;
  if (keywords.includes(normalizedQuery)) return 950;
  if (label === meaningfulPhrase) return 925;
  if (keywords.includes(meaningfulPhrase)) return 900;

  const labelTokens = new Set(searchTokenVariants(item.label));
  const categoryTokens = new Set(searchTokenVariants(item.category));
  const keywordTokens = new Set((item.keywords ?? []).flatMap(searchTokenVariants));
  const allTokens = new Set([...labelTokens, ...categoryTokens, ...keywordTokens]);
  const containsAll = (tokens: Set<string>) => queryTokens.every((queryToken) =>
    [...tokens].some((candidateToken) =>
      tokenMatchQuality(queryToken, candidateToken, exactQueryTokens.has(queryToken)) > 0
    )
  );

  const matchQuality = (tokens: Set<string>) => queryTokens.reduce((total, queryToken) =>
    total + Math.max(
      0,
      ...[...tokens].map((candidateToken) =>
        tokenMatchQuality(queryToken, candidateToken, exactQueryTokens.has(queryToken))
      ),
    ), 0);

  if (containsAll(labelTokens)) return 800 + queryTokens.length * 10 + matchQuality(labelTokens);
  if (containsAll(categoryTokens)) return 650 + queryTokens.length * 10 + matchQuality(categoryTokens);
  if (!containsAll(allTokens)) return null;

  return 500
    + matchQuality(labelTokens) * 10
    + matchQuality(categoryTokens) * 5
    + queryTokens.length;
}

export function searchSiteItems<T extends SiteSearchItem>(items: readonly T[], query: string) {
  const rawQueryTokens = meaningfulQueryTokens(query);
  const exactQueryTokens = new Set(rawQueryTokens.filter((queryToken) =>
    items.some((item) => {
      const primaryTokens = [
        ...searchTokenVariants(item.label),
        ...searchTokenVariants(item.category),
      ];

      return primaryTokens.includes(queryToken);
    })
  ));
  const queryTokens = rawQueryTokens.filter((queryToken) =>
    items.some((item) => itemSearchTokens(item).some((candidateToken) =>
      tokenMatchQuality(queryToken, candidateToken, exactQueryTokens.has(queryToken)) > 0
    ))
  );

  if (!queryTokens.length) return [];

  return items
    .map((item, index) => ({
      item,
      index,
      score: scoreSearchItem(item, query, queryTokens, exactQueryTokens),
    }))
    .filter((match): match is { item: T; index: number; score: number } => match.score !== null)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .map(({ item }) => item);
}
