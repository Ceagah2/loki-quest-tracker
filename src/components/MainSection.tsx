"use client";

import { QUESTS, scoreForOpt } from "@/lib/data";
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
        const questScore = opts.reduce((acc, o) => acc + (state[`done_${q.id}_${o}`] ? scoreForOpt(q.id, o) : 0), 0);

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
                {questScore > 0 && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-900/20 border border-yellow-800/30 text-yellow-500 font-medium">
                    +{questScore}pt
                  </span>
                )}
                <span className="text-[11px] text-stone-500">{doneCount}/{opts.length}</span>
              </div>
            }
          >
            {q.schedule && <ScheduleBadge schedule={q.schedule} />}

            <div className="flex flex-wrap gap-2 mt-2">
              {opts.map((opt) => {
                const done = !!state[`done_${q.id}_${opt}`];
                const blocked = !done && totalMain >= 12;
                const pts = scoreForOpt(q.id, opt);

                return (
                  <button
                    key={opt}
                    onClick={() => !blocked && toggleMain(q.id, opt)}
                    disabled={blocked}
                    title={done ? "Clique para desfazer" : blocked ? "Limite atingido" : `Marcar como entregue (+${pts}pt)`}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-all ${
                      done
                        ? "bg-green-900/20 border-green-800/40 text-green-400 hover:bg-red-900/15 hover:border-red-800/30 hover:text-red-400 cursor-pointer"
                        : blocked
                        ? "opacity-30 cursor-not-allowed border-rune bg-cave-card2 text-stone-500"
                        : "border-rune bg-cave-card2 text-stone-300 hover:border-yellow-700/50 hover:text-yellow-500 cursor-pointer"
                    }`}
                  >
                    <span>{opt}</span>
                    <span className={`text-[10px] px-1 rounded font-medium ${done ? "text-green-600" : "text-stone-600"}`}>
                      {done ? `✓ +${pts}` : `+${pts}pt`}
                    </span>
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
