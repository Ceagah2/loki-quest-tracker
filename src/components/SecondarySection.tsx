"use client";

import { QUESTS, scoreForOpt } from "@/lib/data";
import { QuestCard } from "./QuestCard";
import { ScheduleBadge } from "./ScheduleBadge";
import { HeadHunting } from "./HeadHunting";
import { ImmaturiyAngel } from "./ImmaturiyAngel";
import type { useTracker } from "@/hooks/useTracker";

type TrackerAPI = ReturnType<typeof useTracker>;

export function SecondarySection({ tracker }: { tracker: TrackerAPI }) {
  const { toggleSec, isOpen, toggleCard, state } = tracker;
  const secQuests = QUESTS.filter((q) => q.section === "secondary");

  return (
    <div>
      {secQuests.map((q) => {
        const opts = q.opts ?? [];
        const questScore = opts.reduce((acc, o) => acc + (state[`done_${q.id}_${o}`] ? scoreForOpt(q.id, o) : 0), 0);
        const hasScore = q.type !== "hh" && q.type !== "ia" && questScore > 0;

        let body: React.ReactNode;
        if (q.type === "hh") {
          body = <HeadHunting tracker={tracker} />;
        } else if (q.type === "ia") {
          body = <ImmaturiyAngel tracker={tracker} />;
        } else {
          body = (
            <div className="flex flex-wrap gap-2 mt-2">
              {opts.map((opt) => {
                const done = !!state[`done_${q.id}_${opt}`];
                const pts = scoreForOpt(q.id, opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleSec(q.id, opt)}
                    title={done ? "Clique para desfazer" : `Marcar como entregue (+${pts}pt)`}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-all cursor-pointer ${
                      done
                        ? "bg-green-900/20 border-green-800/40 text-green-400 hover:bg-red-900/15 hover:border-red-800/30 hover:text-red-400"
                        : "border-rune bg-cave-card2 text-stone-300 hover:border-teal-700/50 hover:text-teal-400"
                    }`}
                  >
                    {opt}
                    {pts > 0 && (
                      <span className={`text-[10px] px-1 rounded font-medium ${done ? "text-green-600" : "text-stone-600"}`}>
                        {done ? `✓ +${pts}` : `+${pts}pt`}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        }

        return (
          <QuestCard
            key={q.id}
            id={q.id}
            name={q.name}
            tags={q.tags}
            isOpen={isOpen(q.id)}
            onToggle={() => toggleCard(q.id)}
            badge={
              hasScore ? (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-900/20 border border-yellow-800/30 text-yellow-500 font-medium">
                  +{questScore}pt
                </span>
              ) : undefined
            }
          >
            {q.schedule && <ScheduleBadge schedule={q.schedule} />}
            {body}
          </QuestCard>
        );
      })}
    </div>
  );
}
