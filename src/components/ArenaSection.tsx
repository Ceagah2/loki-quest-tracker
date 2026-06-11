"use client";

import { QUESTS } from "@/lib/data";
import { QuestCard } from "./QuestCard";
import type { useTracker } from "@/hooks/useTracker";

type TrackerAPI = ReturnType<typeof useTracker>;

export function ArenaSection({ tracker }: { tracker: TrackerAPI }) {
  const { arenaWins, addArenaWin, isOpen, toggleCard } = tracker;
  const full = arenaWins >= 5;
  const pct = Math.min(100, (arenaWins / 5) * 100);
  const arenaQuests = QUESTS.filter((q) => q.section === "arena");

  return (
    <div>
      {/* combined progress bar */}
      <div className="mb-3 bg-cave-card border border-rune rounded-lg px-3.5 py-2.5">
        <div className="flex justify-between text-[11px] text-stone-500 mb-1.5">
          <span>Vitórias combinadas (Royal Arena + Arena Tower)</span>
          <span className={full ? "text-red-400 font-medium" : "text-purple-400 font-medium"}>
            {arenaWins} / 5
          </span>
        </div>
        <div className="h-1.5 bg-rune rounded-full overflow-hidden">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${full ? "bg-red-600" : "bg-arena"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {arenaQuests.map((q) => (
        <QuestCard
          key={q.id}
          id={q.id}
          name={q.name}
          tags={q.tags}
          isOpen={isOpen(q.id)}
          onToggle={() => toggleCard(q.id)}
        >
          <div className="mt-3 flex items-center gap-3">
            <button
              onClick={() => addArenaWin(-1)}
              disabled={arenaWins <= 0}
              className="px-4 py-1.5 rounded-md border border-purple-700/40 bg-purple-900/20 text-purple-300 text-xs disabled:opacity-30 hover:bg-purple-900/40 transition-colors"
            >
              − Vitória
            </button>
            <div className="text-center">
              <div className="text-2xl font-medium text-arena leading-none">{arenaWins}</div>
              <div className="text-[10px] text-stone-500 mt-0.5">de 5 hoje</div>
            </div>
            <button
              onClick={() => addArenaWin(1)}
              disabled={full}
              className="px-4 py-1.5 rounded-md border border-purple-700/40 bg-purple-900/20 text-purple-300 text-xs disabled:opacity-30 hover:bg-purple-900/40 transition-colors"
            >
              + Vitória
            </button>
          </div>
          {full && (
            <p className="text-[11px] text-red-400 mt-2">
              Limite de 5 vitórias atingido hoje.
            </p>
          )}
        </QuestCard>
      ))}
    </div>
  );
}
