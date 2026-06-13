"use client";

import { QUESTS, arenaScore } from "@/lib/data";
import { QuestCard } from "./QuestCard";
import { ScheduleBadge } from "./ScheduleBadge";
import type { useTracker } from "@/hooks/useTracker";

type TrackerAPI = ReturnType<typeof useTracker>;

export function ArenaSection({ tracker }: { tracker: TrackerAPI }) {
  const { arenaWinsFor, totalArenaWins, addArenaWin, isOpen, toggleCard } = tracker;
  const full = totalArenaWins >= 5;
  const pct = Math.min(100, (totalArenaWins / 5) * 100);
  const arenaQuests = QUESTS.filter((q) => q.section === "arena");
  const totalArenaScore = arenaScore(totalArenaWins);

  return (
    <div>
      {/* Combined progress bar */}
      <div className="mb-3 bg-cave-card border border-rune rounded-lg px-3.5 py-2.5">
        <div className="flex justify-between text-[11px] text-stone-500 mb-1.5">
          <span>Vitórias combinadas (Royal Arena + Arena Tower)</span>
          <div className="flex items-center gap-2">
            {totalArenaScore > 0 && (
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-900/20 border border-yellow-800/30 text-yellow-500 font-medium">
                +{totalArenaScore}pt
              </span>
            )}
            <span className={`font-medium ${full ? "text-red-400" : "text-purple-400"}`}>
              {totalArenaWins} / 5
            </span>
          </div>
        </div>
        <div className="h-1.5 bg-rune rounded-full overflow-hidden">
          <div
            className={`h-1.5 rounded-full transition-all duration-300 ${full ? "bg-red-600" : "bg-arena"}`}
            style={{ width: `${pct}%` }}
          />
        </div>
        <div className="flex gap-4 mt-2">
          {arenaQuests.map((q) => (
            <span key={q.id} className="text-[10px] text-stone-500">
              {q.name}: <span className="text-purple-400 font-medium">{arenaWinsFor(q.id)}</span>
              
            </span>
          ))}
        </div>
      </div>

      {arenaQuests.map((q) => {
        const wins = arenaWinsFor(q.id);
        return (
          <QuestCard
            key={q.id}
            id={q.id}
            name={q.name}
            tags={q.tags}
            isOpen={isOpen(q.id)}
            onToggle={() => toggleCard(q.id)}
            badge={
              <div className="flex items-center gap-2">
                {wins > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-900/20 border border-yellow-800/30 text-yellow-500 font-medium">
                    +{wins}pt
                  </span>
                )}
                <span className="text-[11px] text-purple-400 font-medium">{wins} vitória{wins !== 1 ? "s" : ""}</span>
              </div>
            }
          >
            {q.schedule && <ScheduleBadge schedule={q.schedule} />}

            <p className="text-[10px] text-stone-600 mt-2.5 mb-1">Score Arena: 1 vitória = 1pt · 3 vitórias = 2pt · 5 vitórias = 3pt (total combinado).</p>

            <div className="mt-1 flex items-center gap-4">
              <button
                onClick={() => addArenaWin(q.id, -1)}
                disabled={wins <= 0}
                className="px-4 py-1.5 rounded-md border border-purple-700/40 bg-purple-900/20 text-purple-300 text-xs disabled:opacity-30 hover:bg-purple-900/40 transition-colors"
              >
                − Vitória
              </button>
              <div className="text-center">
                <div className="text-2xl font-medium text-arena leading-none">{wins}</div>
                <div className="text-[10px] text-stone-500 mt-0.5">
                  {full && wins === 0 ? "limite global atingido" : "de 5 combinadas"}
                </div>
              </div>
              <button
                onClick={() => addArenaWin(q.id, 1)}
                disabled={full}
                className="px-4 py-1.5 rounded-md border border-purple-700/40 bg-purple-900/20 text-purple-300 text-xs disabled:opacity-30 hover:bg-purple-900/40 transition-colors"
              >
                + Vitória
              </button>
            </div>

            {full && (
              <p className="text-[11px] text-red-400 mt-2">
                Limite de 5 vitórias combinadas atingido hoje.
              </p>
            )}
          </QuestCard>
        );
      })}
    </div>
  );
}
