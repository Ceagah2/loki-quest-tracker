export type QuestSection = "arena" | "main" | "secondary";
export type QuestType = "standard" | "hh" | "ia";
export type TagType = "pvp" | "pve" | "drop" | "misc";

export interface Quest {
  id: string;
  name: string;
  section: QuestSection;
  tags: TagType[];
  type?: QuestType;
  opts?: string[];
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
  // arena
  arena_wins: number;
  // main: done_<questId>_<opt> = true
  // secondary standard: done_<questId>_<opt> = true
  // head hunting: hh_<mobName> = true
  // immaturity angel: ia_level = 0..20
  ia_level: number;
  // loki: loki_sel_<tier> = qid, loki_done_<tier> = true
  // ui state: _o_<id> = bool, _lo_<tier> = bool
  [key: string]: boolean | number;
}

export const INITIAL_STATE: TrackerState = {
  arena_wins: 0,
  ia_level: 0,
};
