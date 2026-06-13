import type { Quest, LokiTier } from "@/types";

export const QUESTS: Quest[] = [
  {
    id: "royal-arena", name: "Royal Arena", section: "arena", tags: ["pvp"],
    schedule: { server: "1 e 3", window: "40 - 43" },
  },
  {
    id: "arena-tower", name: "Arena Tower", section: "arena", tags: ["pvp"],
    schedule: { server: "4 e 6", window: "20 - 23" },
  },
  {
    id: "boss-rampage", name: "Boss Rampage", section: "main", tags: ["pve"], opts: ["I", "II", "III"],
    schedule: { server: "Todos", window: "Qualquer hora" },
  },
  {
    id: "chrono-waves", name: "Chrono Waves", section: "main", tags: ["pve"], opts: ["I", "II", "III"],
    schedule: { server: "Todos", window: "Qualquer hora" },
  },
  {
    id: "desert-royale", name: "Desert Royale", section: "main", tags: ["pvp"], opts: ["I", "II", "III"],
    schedule: { server: "2", window: "00 - 03" },
  },
  {
    id: "quest-mortal", name: "Quest Mortal", section: "main", tags: ["pvp", "pve"], opts: ["I", "II", "III"],
    schedule: { server: "Todos", window: "04, 14, 24, 34" },
  },
  {
    id: "muspellheim", name: "Muspellheim", section: "main", tags: ["pvp", "pve"], opts: ["I", "II", "III"],
    schedule: { server: "5", window: "Qualquer hora" },
  },
  {
    id: "reliquary", name: "Reliquary", section: "main", tags: ["drop"], opts: ["I", "II", "III"],
    schedule: { server: "Todos", window: "02, 17, 32, 47" },
  },
  {
    id: "tauron-loot", name: "Tauron Loot", section: "main", tags: ["drop"], opts: ["I", "II", "III"],
    schedule: { server: "Todos", window: "Qualquer hora" },
  },
  {
    id: "ancient-titan", name: "Ancient Titan", section: "secondary", tags: ["pvp", "pve"], opts: ["I"],
    schedule: { server: "3 e 5", window: "15 - 18" },
  },
  { id: "head-hunting", name: "Head Hunting", section: "secondary", tags: ["pve"], type: "hh" },
  { id: "immaturity-angel", name: "Immaturity Angel", section: "secondary", tags: ["pve"], type: "ia" },
  { id: "sleipnir", name: "Sleipnir Expedition", section: "secondary", tags: ["misc"], opts: ["1 Dia", "2 Dias", "3 Dias"] },
  { id: "treasure-hunting", name: "Treasure Hunting", section: "secondary", tags: ["misc"], opts: ["I", "II", "III"] },
];

export const HH_TIERS: Record<string, string[]> = {
  I: ["Zombie Bear", "Zombie Troll", "Hydra", "Dark Elf", "Skeleton Warrior"],
  II: ["Fire Golem", "Gargoyle", "Froggy Assassin", "Grim Lock", "Stone Golem"],
  III: ["Hezling", "Dark Knight", "Death Knight", "Bone Dragon", "Demon Lord"],
};

export const LOKI_QUEST_NAMES: Record<string, string> = {
  "immaturity-angel": "Immaturity Angel",
  "tauron-loot": "Tauron Loot",
  "muspellheim": "Muspellheim",
  "reliquary": "Reliquary",
  "desert-royale": "Desert Royale",
  "mount-upgrade": "Aprimoramento de Montaria",
};

export const LOKI_DATA: LokiTier[] = [
  {
    tier: 1,
    quests: [
      { qid: "immaturity-angel", desc: "Sacrifique Immaturity Coins: 11" },
      { qid: "tauron-loot", desc: "Sacrifique Taron Loots: 16" },
      { qid: "muspellheim", desc: "Participe da Quest: 2" },
      { qid: "reliquary", desc: "Sacrifique Medalhão Valknut: 3" },
      { qid: "desert-royale", desc: "Participe da Quest: 2" },
      { qid: "mount-upgrade", desc: "Tentar evoluir Level: 11" },
    ],
  },
  {
    tier: 2,
    quests: [
      { qid: "immaturity-angel", desc: "Sacrifique Immaturity Coins: 16" },
      { qid: "tauron-loot", desc: "Sacrifique Taron Loots Gold: 11" },
      { qid: "muspellheim", desc: "Participe da Quest: 4" },
      { qid: "reliquary", desc: "Sacrifique Medalhão Hórus: 3" },
      { qid: "desert-royale", desc: "Participe da Quest: 4" },
      { qid: "mount-upgrade", desc: "Tentar evoluir Level: 21" },
    ],
  },
  {
    tier: 3,
    quests: [
      { qid: "immaturity-angel", desc: "Sacrifique Immaturity Coins: 21" },
      { qid: "tauron-loot", desc: "Roube Adversários: 6" },
      { qid: "muspellheim", desc: "Obtenha Artefatos: 6" },
      { qid: "reliquary", desc: "Sacrifique Medalhão Hórus: 6" },
      { qid: "desert-royale", desc: "Derrote Jogadores na Quest: 2" },
      { qid: "mount-upgrade", desc: "Tentar evoluir Qualidade: 11" },
    ],
  },
  {
    tier: 4,
    quests: [
      { qid: "immaturity-angel", desc: "Sacrifique Immaturity Coins: 26" },
      { qid: "tauron-loot", desc: "Roube Adversários: 11" },
      { qid: "muspellheim", desc: "Derrote Jogadores na Quest: 2" },
      { qid: "reliquary", desc: "Sacrifique Medalhão Mjolnir: 3" },
      { qid: "desert-royale", desc: "Obtenha Desert Coins de Vermes: 6" },
      { qid: "mount-upgrade", desc: "Tentar evoluir Level: 51" },
    ],
  },
  {
    tier: 5,
    quests: [
      { qid: "immaturity-angel", desc: "Sacrifique Immaturity Coins: 31" },
      { qid: "tauron-loot", desc: "Roube Adversários: 16" },
      { qid: "muspellheim", desc: "Derrote Jogadores na Quest: 6" },
      { qid: "reliquary", desc: "Sacrifique Medalhão Mjolnir: 6" },
      { qid: "desert-royale", desc: "Derrote Jogadores na Quest: 6" },
      { qid: "mount-upgrade", desc: "Tentar evoluir Qualidade: 21" },
    ],
  },
];

// ─── Score Quest ──────────────────────────────────────────────────────────────
// Maps option label → score points. Used by tracker and UI.
export const OPT_SCORE: Record<string, number> = {
  "I": 1,
  "II": 2,
  "III": 3,
  // Sleipnir Expedition
  "1 Dia": 1,
  "2 Dias": 2,
  "3 Dias": 3,
};

// Returns the score for a given quest option.
// Ancient Titan always gives 3 regardless of option label.
export function scoreForOpt(questId: string, opt: string): number {
  if (questId === "ancient-titan") return 3;
  return OPT_SCORE[opt] ?? 0;
}

// Returns the Score Quest for a given total number of arena wins (combined).
// Score is CUMULATIVE per threshold reached:
//   >= 1 win  → +1pt
//   >= 3 wins → +2pt (additional)
//   >= 5 wins → +3pt (additional)
// Total possible: 1+2+3 = 6pt at 5 wins.
export function arenaScore(totalWins: number): number {
  let score = 0;
  if (totalWins >= 1) score += 1;
  if (totalWins >= 3) score += 2;
  if (totalWins >= 5) score += 3;
  return score;
}

// Max possible daily Score Quest (all Main I/II/III + both arenas full + secondary standard)
// Exposed so UI can show max potential later if needed.
export const MAX_DAILY_SCORE = (() => {
  let s = 0;
  // Main: each quest has I(1)+II(2)+III(3) = 6, but capped at 12 total deliveries
  // Just sum all opts across all scorable quests for the theoretical max
  QUESTS.forEach(q => {
    if (q.type === "hh" || q.type === "ia") return;
    (q.opts ?? []).forEach(o => { s += scoreForOpt(q.id, o); });
  });
  // Arena: 5 wins max — we don't know the mix of I/II/III so max = 5×3 = 15
  s += 15;
  return s;
})();
