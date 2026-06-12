"use client";

import { QUESTS } from "@/lib/data";
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
                return (
                  <button
                    key={opt}
                    onClick={() => toggleSec(q.id, opt)}
                    title={done ? "Clique para desfazer" : "Marcar como entregue"}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-all cursor-pointer ${
                      done
                        ? "bg-green-900/20 border-green-800/40 text-green-400 hover:bg-red-900/15 hover:border-red-800/30 hover:text-red-400"
                        : "border-rune bg-cave-card2 text-stone-300 hover:border-teal-700/50 hover:text-teal-400"
                    }`}
                  >
                    {opt}
                    {done && <span className="text-xs opacity-70">✓</span>}
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
          >
            {q.schedule && <ScheduleBadge schedule={q.schedule} />}
            {body}
          </QuestCard>
        );
      })}
    </div>
  );
}
