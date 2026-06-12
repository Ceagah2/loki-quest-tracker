export type QuestSection = "arena" | "main" | "secondary";
export type QuestType = "standard" | "hh" | "ia";
export type TagType = "pvp" | "pve" | "drop" | "misc";

export interface QuestSchedule {
  server: string;
  window: string;
}

export interface Quest {
  id: string;
  name: string;
  section: QuestSection;
  tags: TagType[];
  type?: QuestType;
  opts?: string[];
  schedule?: QuestSchedule;
}

export interface LokiQuestEntry {
  qid: string;
  desc: string;
}

export interface LokiTier {
  tier: number;
  quests: LokiQuestEntry[];
}

export interface TrackerState {
  // arena per-quest wins: arena_wins_<id>
  ia_level: number;
  [key: string]: boolean | number;
}

export const INITIAL_STATE: TrackerState = {
  ia_level: 0,
};
