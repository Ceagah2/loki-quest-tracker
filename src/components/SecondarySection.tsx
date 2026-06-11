"use client";

import { QUESTS } from "@/lib/data";
import { QuestCard } from "./QuestCard";
import { HeadHunting } from "./HeadHunting";
import { ImmaturiyAngel } from "./ImmaturiyAngel";
import type { useTracker } from "@/hooks/useTracker";

type TrackerAPI = ReturnType<typeof useTracker>;

export function SecondarySection({ tracker }: { tracker: TrackerAPI }) {
  const { markSec, isOpen, toggleCard, state } = tracker;
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
            <div className="flex flex-wrap gap-2 mt-3">
              {opts.map((opt) => {
                const done = !!state[`done_${q.id}_${opt}`];
                return (
                  <button
                    key={opt}
                    onClick={() => !done && markSec(q.id, opt)}
                    disabled={done}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md border text-sm transition-all ${
                      done
                        ? "bg-green-900/20 border-green-800/40 text-green-400 cursor-not-allowed"
                        : "border-rune bg-cave-card2 text-stone-300 hover:border-teal-700/50 hover:text-teal-400 cursor-pointer"
                    }`}
                  >
                    {opt}
                    {done && <span className="text-xs">✓</span>}
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
            {body}
          </QuestCard>
        );
      })}
    </div>
  );
}
