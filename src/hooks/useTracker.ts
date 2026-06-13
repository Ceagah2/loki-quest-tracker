"use client";

import { useState, useEffect, useCallback } from "react";
import { QUESTS, HH_TIERS, scoreForOpt, arenaScore } from "@/lib/data";
import type { TrackerState } from "@/types";

const STORAGE_KEY = "quest-tracker-v3";

const DEFAULT_STATE: TrackerState = { ia_level: 0 };

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
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch {}
}

export function useTracker() {
  const [state, setState] = useState<TrackerState>(DEFAULT_STATE);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setState(loadState()); setMounted(true); }, []);

  const update = useCallback((updater: (prev: TrackerState) => TrackerState) => {
    setState((prev) => { const next = updater(prev); saveState(next); return next; });
  }, []);

  // ─── Arena (per-quest wins, shared cap of 5) ──────────────────────────────
  const arenaWinsFor = (id: string) => (state[`arena_wins_${id}`] as number) || 0;
  const totalArenaWins = QUESTS.filter(q => q.section === "arena")
    .reduce((sum, q) => sum + arenaWinsFor(q.id), 0);

  const addArenaWin = useCallback((questId: string, delta: number) => {
    update((s) => {
      const current = (s[`arena_wins_${questId}`] as number) || 0;
      const total = QUESTS.filter(q => q.section === "arena")
        .reduce((sum, q) => sum + ((s[`arena_wins_${q.id}`] as number) || 0), 0);
      const next = current + delta;
      if (next < 0) return s;
      if (delta > 0 && total >= 5) return s;
      return { ...s, [`arena_wins_${questId}`]: next };
    });
  }, [update]);

  // ─── Main quests ──────────────────────────────────────────────────────────
  const totalMain = QUESTS.filter(q => q.section === "main").reduce((acc, q) =>
    acc + (q.opts ?? []).filter(o => !!state[`done_${q.id}_${o}`]).length, 0);

  const toggleMain = useCallback((questId: string, opt: string) => {
    update((s) => {
      const key = `done_${questId}_${opt}`;
      if (s[key]) {
        // undo: remove
        const next = { ...s };
        delete next[key];
        return next;
      }
      // mark: check limit
      const total = QUESTS.filter(q => q.section === "main").reduce((acc, q) =>
        acc + (q.opts ?? []).filter(o => !!s[`done_${q.id}_${o}`]).length, 0);
      if (total >= 12) return s;
      return { ...s, [key]: true };
    });
  }, [update]);

  // ─── Secondary standard (toggle) ─────────────────────────────────────────
  const toggleSec = useCallback((questId: string, opt: string) => {
    update((s) => {
      const key = `done_${questId}_${opt}`;
      const next = { ...s };
      if (next[key]) delete next[key]; else next[key] = true;
      return next;
    });
  }, [update]);

  // ─── Head Hunting (toggle individual mob) ────────────────────────────────
  const toggleMob = useCallback((mob: string) => {
    update((s) => {
      const key = `hh_${mob}`;
      const next = { ...s };
      if (next[key]) delete next[key]; else next[key] = true;
      return next;
    });
  }, [update]);

  const hhDone = (mob: string) => !!state[`hh_${mob}`];
  const hhTierComplete = (tier: string) => (HH_TIERS[tier] ?? []).every(m => !!state[`hh_${m}`]);

  // ─── Immaturity Angel ─────────────────────────────────────────────────────
  const iaLevel = (state.ia_level as number) || 0;
  const iaStep = useCallback((stepIndex: number) => {
    update((s) => ({ ...s, ia_level: stepIndex + 1 }));
  }, [update]);
  const iaUndo = useCallback(() => {
    update((s) => ({ ...s, ia_level: Math.max(0, (s.ia_level as number) - 1) }));
  }, [update]);

  // ─── Loki Challenges ──────────────────────────────────────────────────────
  const selectLoki = useCallback((tier: number, qid: string) => {
    update((s) => ({ ...s, [`loki_sel_${tier}`]: qid as unknown as number }));
  }, [update]);

  const completeLoki = useCallback((tier: number) => {
    update((s) => {
      if (!s[`loki_sel_${tier}`]) return s;
      return { ...s, [`loki_done_${tier}`]: true };
    });
  }, [update]);

  const undoLoki = useCallback((tier: number) => {
    update((s) => {
      const next = { ...s };
      delete next[`loki_done_${tier}`];
      return next;
    });
  }, [update]);

  const clearLokiSel = useCallback((tier: number) => {
    update((s) => { const next = { ...s }; delete next[`loki_sel_${tier}`]; return next; });
  }, [update]);

  const lokiTierDone = (tier: number) => !!state[`loki_done_${tier}`];
  const lokiSel = (tier: number) => state[`loki_sel_${tier}`] as unknown as string | undefined;
  const lokiUnlocked = (tier: number) => tier === 1 || !!state[`loki_done_${tier - 1}`];

  // ─── UI collapse ──────────────────────────────────────────────────────────
  const isOpen = (id: string, prefix = "_o_") => state[`${prefix}${id}`] !== false;
  const toggleCard = useCallback((id: string, prefix = "_o_") => {
    update((s) => ({ ...s, [`${prefix}${id}`]: s[`${prefix}${id}`] === false ? true : false }));
  }, [update]);

  // ─── Totals ───────────────────────────────────────────────────────────────
  const totalSecondary = (() => {
    let t = 0;
    QUESTS.filter(q => q.section === "secondary").forEach(q => {
      if (q.type === "hh") Object.values(HH_TIERS).forEach(mobs => mobs.forEach(m => { if (state[`hh_${m}`]) t++; }));
      else if (q.type === "ia") t += Math.min(iaLevel, 20);
      else (q.opts ?? []).forEach(o => { if (state[`done_${q.id}_${o}`]) t++; });
    });
    return t;
  })();


  // ─── Quest Score ──────────────────────────────────────────────────────────
  const totalQuestScore = (() => {
    let score = 0;
    // Main + Secondary standard opts
    QUESTS.filter(q => q.section !== "arena" && q.type !== "hh" && q.type !== "ia").forEach(q => {
      (q.opts ?? []).forEach(o => {
        if (state[`done_${q.id}_${o}`]) score += scoreForOpt(q.id, o);
      });
    });
    // Arena: score is based on TOTAL combined wins across all arenas.
    // 1 win = 1pt, 3 wins = 2pt, 5 wins = 3pt.
    const totalWins = QUESTS.filter(q => q.section === "arena")
      .reduce((sum, q) => sum + ((state[`arena_wins_${q.id}`] as number) || 0), 0);
    score += arenaScore(totalWins);
    return score;
  })();

  // ─── Reset ────────────────────────────────────────────────────────────────
  const resetDay = useCallback(() => {
    update((s) => {
      const keep: TrackerState = { ia_level: s.ia_level };
      Object.keys(s).forEach(k => {
        if (k.startsWith("hh_") || k.startsWith("_o_") || k.startsWith("_lo_")) keep[k] = s[k];
      });
      return keep;
    });
  }, [update]);

  return {
    mounted, state,
    arenaWinsFor, totalArenaWins, addArenaWin,
    totalMain, toggleMain,
    toggleSec,
    toggleMob, hhDone, hhTierComplete,
    iaLevel, iaStep, iaUndo,
    selectLoki, completeLoki, undoLoki, clearLokiSel,
    lokiTierDone, lokiSel, lokiUnlocked,
    isOpen, toggleCard,
    totalSecondary,
    totalQuestScore,
    resetDay,
  };
}
