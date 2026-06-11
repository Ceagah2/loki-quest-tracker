import type { Quest, LokiTier } from "@/types";

export const QUESTS: Quest[] = [
  { id: "royal-arena", name: "Royal Arena", section: "arena", tags: ["pvp"] },
  { id: "arena-tower", name: "Arena Tower", section: "arena", tags: ["pvp"] },
  { id: "boss-rampage", name: "Boss Rampage", section: "main", tags: ["pve"], opts: ["I", "II", "III"] },
  { id: "chrono-waves", name: "Chrono Waves", section: "main", tags: ["pve"], opts: ["I", "II", "III"] },
  { id: "desert-royale", name: "Desert Royale", section: "main", tags: ["pvp"], opts: ["I", "II", "III"] },
  { id: "quest-mortal", name: "Quest Mortal", section: "main", tags: ["pvp", "pve"], opts: ["I", "II", "III"] },
  { id: "muspellheim", name: "Muspellheim", section: "main", tags: ["pvp", "pve"], opts: ["I", "II", "III"] },
  { id: "reliquary", name: "Reliquary", section: "main", tags: ["drop"], opts: ["I", "II", "III"] },
  { id: "tauron-loot", name: "Tauron Loot", section: "main", tags: ["drop"], opts: ["I", "II", "III"] },
  { id: "ancient-titan", name: "Ancient Titan", section: "secondary", tags: ["pvp", "pve"], opts: ["I"] },
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
