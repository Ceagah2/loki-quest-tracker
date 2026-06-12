"use client";

import { QUESTS } from "@/lib/data";
import { QuestCard } from "./QuestCard";
import { ScheduleBadge } from "./ScheduleBadge";
import type { useTracker } from "@/hooks/useTracker";

type TrackerAPI = ReturnType<typeof useTracker>;

export function MainSection({ tracker }: { tracker: TrackerAPI }) {
  const { totalMain, toggleMain, isOpen, toggleCard, state } = tracker;
  const mainQuests = QUESTS.filter((q) => q.section === "main");

  return (
    <div>
      {mainQuests.map((q) => {
        const opts = q.opts ?? [];
        const doneCount = opts.filter((o) => !!state[`done_${q.id}_${o}`]).length;

        return (
          <QuestCard
            key={q.id}
            id={q.id}
            name={q.name}
            tags={q.tags}
            isOpen={isOpen(q.id)}
            onToggle={() => toggleCard(q.id)}
            badge={
              <span className="text-[11px] text-stone-500">
                {doneCount}/{opts.length}
              </span>
            }
          >
            {q.schedule && <ScheduleBadge schedule={q.schedule} />}

            <div className="flex flex-wrap gap-2 mt-2">
              {opts.map((opt) => {
                const done = !!state[`done_${q.id}_${opt}`];
                const blocked = !done && totalMain >= 12;

                return (
                  <button
                    key={opt}
                    onClick={() => !blocked && toggleMain(q.id, opt)}
                    disabled={blocked}
                    title={done ? "Clique para desfazer" : blocked ? "Limite atingido" : "Marcar como entregue"}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-all ${
                      done
                        ? "bg-green-900/20 border-green-800/40 text-green-400 hover:bg-red-900/15 hover:border-red-800/30 hover:text-red-400 cursor-pointer"
                        : blocked
                        ? "opacity-30 cursor-not-allowed border-rune bg-cave-card2 text-stone-500"
                        : "border-rune bg-cave-card2 text-stone-300 hover:border-yellow-700/50 hover:text-yellow-500 cursor-pointer"
                    }`}
                  >
                    <span>{opt}</span>
                    {done && <span className="text-xs opacity-70">✓</span>}
                  </button>
                );
              })}
            </div>

            {totalMain >= 12 && doneCount < opts.length && (
              <p className="text-[11px] text-red-400 mt-2">
                Limite de 12 entregas Main atingido hoje.
              </p>
            )}
          </QuestCard>
        );
      })}
    </div>
  );
}
