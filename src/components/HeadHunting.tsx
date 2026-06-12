"use client";

import { HH_TIERS } from "@/lib/data";
import type { useTracker } from "@/hooks/useTracker";

type TrackerAPI = ReturnType<typeof useTracker>;

export function HeadHunting({ tracker }: { tracker: TrackerAPI }) {
  const { hhDone, hhTierComplete, toggleMob } = tracker;

  return (
    <div className="mt-3 space-y-3">
      <p className="text-[10px] text-stone-600">Clique novamente num mob para desfazer. Progresso permanente.</p>
      {Object.entries(HH_TIERS).map(([tier, mobs]) => {
        const complete = hhTierComplete(tier);
        return (
          <div key={tier}>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] text-stone-500 uppercase tracking-wide">Tier {tier}</span>
              {complete && <span className="text-[10px] text-green-400">✓ completo</span>}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {mobs.map((mob) => {
                const done = hhDone(mob);
                return (
                  <button
                    key={mob}
                    onClick={() => toggleMob(mob)}
                    title={done ? "Clique para desfazer" : "Marcar como entregue"}
                    className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md border text-xs transition-all cursor-pointer ${
                      done
                        ? "bg-green-900/15 border-green-800/35 text-green-400 hover:bg-red-900/10 hover:border-red-800/30 hover:text-red-400"
                        : "border-rune bg-cave-card2 text-stone-300 hover:border-teal-700/50 hover:text-teal-400"
                    }`}
                  >
                    {mob}
                    {done && <span className="text-[10px] opacity-70">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
