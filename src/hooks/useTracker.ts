"use client";

import { useState, useEffect, useCallback } from "react";
import { QUESTS, HH_TIERS } from "@/lib/data";
import type { TrackerState } from "@/types";

const STORAGE_KEY = "quest-tracker-v2";

const DEFAULT_STATE: TrackerState = { arena_wins: 0, ia_level: 0 };

function loadState(): TrackerState {
  if (typeof window === "undefined") return { ...DEFAULT_STATE };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { ...DEFAULT_STATE };
    return { ...DEFAULT_STATE, ...JSON.parse(raw) };
  } catch {
    return { ...DEFAULT_STATE };
  }
}

function saveState(s: TrackerState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(s));
  } catch {}
}

export function useTracker() {
  const [state, setState] = useState<TrackerState>(DEFAULT_STATE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setState(loadState());
    setMounted(true);
  }, []);

  const update = useCallback((updater: (prev: TrackerState) => TrackerState) => {
    setState((prev) => {
      const next = updater(prev);
      saveState(next);
      return next;
    });
  }, []);

  // ─── Arena ────────────────────────────────────────────────────────────────
  const arenaWins = state.arena_wins as number;

  const addArenaWin = useCallback(
    (delta: number) => {
      update((s) => ({
        ...s,
        arena_wins: Math.min(5, Math.max(0, (s.arena_wins as number) + delta)),
      }));
    },
    [update]
  );

  // ─── Main quests ──────────────────────────────────────────────────────────
  const totalMain = QUESTS.filter((q) => q.section === "main").reduce((acc, q) => {
    return acc + (q.opts ?? []).filter((o) => !!state[`done_${q.id}_${o}`]).length;
  }, 0);

  const markMain = useCallback(
    (questId: string, opt: string) => {
      if (totalMain >= 12) return;
      update((s) => ({ ...s, [`done_${questId}_${opt}`]: true }));
    },
    [totalMain, update]
  );

  // ─── Secondary standard ───────────────────────────────────────────────────
  const markSec = useCallback(
    (questId: string, opt: string) => {
      update((s) => ({ ...s, [`done_${questId}_${opt}`]: true }));
    },
    [update]
  );

  // ─── Head Hunting ─────────────────────────────────────────────────────────
  const markMob = useCallback(
    (mob: string) => {
      update((s) => ({ ...s, [`hh_${mob}`]: true }));
    },
    [update]
  );

  const hhDone = (mob: string) => !!state[`hh_${mob}`];

  const hhTierComplete = (tier: string) =>
    (HH_TIERS[tier] ?? []).every((m) => !!state[`hh_${m}`]);

  // ─── Immaturity Angel ─────────────────────────────────────────────────────
  const iaLevel = state.ia_level as number;

  const iaStep = useCallback(
    (stepIndex: number) => {
      update((s) => ({ ...s, ia_level: stepIndex + 1 }));
    },
    [update]
  );

  const iaUndo = useCallback(() => {
    update((s) => ({ ...s, ia_level: Math.max(0, (s.ia_level as number) - 1) }));
  }, [update]);

  // ─── Loki Challenges ──────────────────────────────────────────────────────
  const selectLoki = useCallback(
    (tier: number, qid: string) => {
      update((s) => ({ ...s, [`loki_sel_${tier}`]: qid as unknown as number }));
    },
    [update]
  );

  const completeLoki = useCallback(
    (tier: number) => {
      update((s) => {
        if (!s[`loki_sel_${tier}`]) return s;
        return { ...s, [`loki_done_${tier}`]: true };
      });
    },
    [update]
  );

  const clearLokiSel = useCallback(
    (tier: number) => {
      update((s) => {
        const next = { ...s };
        delete next[`loki_sel_${tier}`];
        return next;
      });
    },
    [update]
  );

  const lokiTierDone = (tier: number) => !!state[`loki_done_${tier}`];
  const lokiSel = (tier: number) => state[`loki_sel_${tier}`] as unknown as string | undefined;
  const lokiUnlocked = (tier: number) => tier === 1 || !!state[`loki_done_${tier - 1}`];

  // ─── UI card collapse ─────────────────────────────────────────────────────
  const isOpen = (id: string, prefix = "_o_") => state[`${prefix}${id}`] !== false;

  const toggleCard = useCallback(
    (id: string, prefix = "_o_") => {
      update((s) => ({ ...s, [`${prefix}${id}`]: s[`${prefix}${id}`] === false ? true : false }));
    },
    [update]
  );

  // ─── Totals ───────────────────────────────────────────────────────────────
  const totalSecondary = (() => {
    let t = 0;
    QUESTS.filter((q) => q.section === "secondary").forEach((q) => {
      if (q.type === "hh") {
        Object.values(HH_TIERS).forEach((mobs) => mobs.forEach((m) => { if (state[`hh_${m}`]) t++; }));
      } else if (q.type === "ia") {
        t += Math.min(iaLevel, 20);
      } else {
        (q.opts ?? []).forEach((o) => { if (state[`done_${q.id}_${o}`]) t++; });
      }
    });
    return t;
  })();

  // ─── Reset ────────────────────────────────────────────────────────────────
  const resetDay = useCallback(() => {
    update((s) => {
      const keep: TrackerState = { arena_wins: 0, ia_level: s.ia_level };
      Object.keys(s).forEach((k) => {
        if (k.startsWith("hh_") || k.startsWith("_o_") || k.startsWith("_lo_")) {
          keep[k] = s[k];
        }
      });
      return keep;
    });
  }, [update]);

  return {
    mounted,
    state,
    // arena
    arenaWins,
    addArenaWin,
    // main
    totalMain,
    markMain,
    // secondary
    markSec,
    markMob,
    hhDone,
    hhTierComplete,
    // ia
    iaLevel,
    iaStep,
    iaUndo,
    // loki
    selectLoki,
    completeLoki,
    clearLokiSel,
    lokiTierDone,
    lokiSel,
    lokiUnlocked,
    // ui
    isOpen,
    toggleCard,
    // totals
    totalSecondary,
    // reset
    resetDay,
  };
}
